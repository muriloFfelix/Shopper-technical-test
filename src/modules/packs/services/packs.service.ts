import { Inject, Injectable } from '@nestjs/common';
import { PackEntity } from '../entities/packs.entity';
import { Repository } from 'typeorm/repository/Repository';
import { productTypeEnum } from '../../../common/enums/productTypeEnum';

@Injectable()
export class PacksService {

    //#region Constructor

    constructor(
        @Inject('PACK_REPOSITORY')
        private repository: Repository<PackEntity>,
    ) { }

    //#endregion

    //#region Public methods

    public async fetchPackFromProduct(code: number): Promise<{ entity: PackEntity[], type: string } | null> {
        const product = await this.repository.find({ where: { product_id: code } })
        if (product.length !== 0)
            return { entity: product, type: productTypeEnum.PRODUCT }

        const pack = await this.repository.find({ where: { pack_id: code } })
        if (pack.length !== 0)
            return { entity: pack, type: productTypeEnum.PACK }

        return null;
    }

    //#endregion
}
