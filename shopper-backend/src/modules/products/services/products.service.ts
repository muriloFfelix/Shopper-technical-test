import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from '../entities/products.entity';
import { Repository } from 'typeorm/repository/Repository';
import { NewPriceEntryPayload } from '../models/new-price-entry.payload';
import { ProductPriceUpdateProxy } from '../models/product-price-update.proxy';
import { PacksService } from '../../packs/services/packs.service';
import { PackEntity } from '../../packs/entities/packs.entity';
import { productTypeEnum } from '../../../common/enums/productTypeEnum';

@Injectable()
export class ProductsService {

    //#region Constructor

    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private repository: Repository<ProductEntity>,
        private readonly packsService: PacksService
    ) { }

    //#endregion

    //#region Public methods

    async validate(newPriceEntries: NewPriceEntryPayload[]): Promise<any> {
        const response: ProductPriceUpdateProxy[] = [];

        await Promise.all(newPriceEntries.map(async entry => {
            const productEntity = await this.repository.findOne({ where: { code: +entry.product_code } });

            const priceUpdate: ProductPriceUpdateProxy = {
                product_code: +entry.product_code,
                name: productEntity?.name,
                current_price: productEntity?.sales_price,
                new_price: entry.new_price,
                errors: [],
            }

            this.validatePriceUpdate(productEntity, priceUpdate, entry, newPriceEntries)

            response.push(priceUpdate);
        }))

        return response
    }

    async update(newPriceEntries: NewPriceEntryPayload[]): Promise<ProductEntity[]> {
        const newPrices: ProductEntity[] = []

        await Promise.all(newPriceEntries.map(async entry => {
            const entity = await this.repository.findOne({ where: { code: +entry.product_code } })

            const priceUpdate: ProductEntity = {
                code: entity!.code,
                name: entity!.name,
                cost_price: entity!.cost_price,
                sales_price: entry.new_price,
            }

            this.repository.save(priceUpdate);
            newPrices.push(priceUpdate)
        }))

        return newPrices;
    }

    //#endregion

    //#region Private methods
    private async validatePriceUpdate(productEntity: ProductEntity | null, priceUpdate: ProductPriceUpdateProxy, newPriceEntry: NewPriceEntryPayload, newPriceEntries: NewPriceEntryPayload[]) {
        if (!productEntity)
            priceUpdate.errors!.push(`Não há produto(s) associado(s) ao código ${+newPriceEntry.product_code}`)
        else {
            priceUpdate.errors?.push(...this.validateProductNewPrice(newPriceEntry, productEntity))
        }

        const packEntity = await this.packsService.fetchPackFromProduct(+newPriceEntry.product_code)
        if (packEntity !== null) {
            priceUpdate.errors?.push(
                ...await this.validatePackToProductEntry(packEntity.entity, packEntity.type, newPriceEntries, priceUpdate))
        }
    }

    private validateProductNewPrice(entry: NewPriceEntryPayload, product: ProductEntity): string[] {
        const errors = []

        if (entry.new_price < product.cost_price)
            errors.push(`O novo preço é menor que o preço de custo do produto (${product.cost_price})`)

        if (+entry.new_price < (+product.sales_price * 0.9) || +entry.new_price > (+product.sales_price * 1.1))
            errors.push(`O reajuste supera a margem de 10%`)

        return errors;
    }

    private async validatePackToProductEntry(entities: PackEntity[], type: string, entries: NewPriceEntryPayload[], priceUpdate: ProductPriceUpdateProxy): Promise<string[]> {
        const errors: string[] = [];
        let packEntries: NewPriceEntryPayload[] = [];

        switch (type) {
            case productTypeEnum.PRODUCT:
                packEntries = entries.filter(entry => entities.some(e => e.pack_id === +entry.product_code))
                break;
            case productTypeEnum.PACK:
                packEntries = entries.filter(entry => entities.some(e => e.product_id === +entry.product_code))
                break
            default:
                break;
        }

        if (packEntries?.length === 0)
            errors.push(`É necessário incluir o reajuste de um ou mais dos seguintes items relacionados ao produto: ${entities.map(e => type === 'pack' ? e.product_id : e.pack_id).join(', ')}`)

        else {
            if (type === productTypeEnum.PACK) {
                const productEntities = await Promise.all(packEntries.map(async entry =>
                    await this.repository.findOne({ where: { code: +entry.product_code } })
                ))

                let desiredPrice = this.getDesiredPrice(priceUpdate, productEntities, entities, packEntries);

                if (+priceUpdate.new_price! !== desiredPrice)
                    errors.push(`${priceUpdate.new_price} não está de acordo com o reajuste dos items: ${productEntities.map(e => e?.code).join(', ')}. valor esperado: ${desiredPrice}`);
            }
        }
        return errors
    }

    private getDesiredPrice(priceUpdate: ProductPriceUpdateProxy, productEntities: (ProductEntity | null)[], entities: PackEntity[], packEntries: NewPriceEntryPayload[]) {
        let desiredPrice = +priceUpdate.current_price!;
        productEntities.forEach((element) => {
            const elementPack = entities.find(e => e.product_id === element?.code);

            desiredPrice -= (
                +productEntities.find(e => e?.code === element?.code)!.sales_price * elementPack!.qty);
            desiredPrice += (
                +packEntries.find(e => +e.product_code === element?.code)!.new_price * elementPack!.qty);
        });
        desiredPrice = +desiredPrice.toFixed(2);
        return desiredPrice;
    }

    //#endregion
}
