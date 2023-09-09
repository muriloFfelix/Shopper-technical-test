import { Body, Controller, Get, HttpCode, ParseArrayPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { NewPriceEntryPayload } from '../models/new-price-entry.payload';

@ApiTags('products')
@Controller('products')
export class ProductsController {

    constructor(
        private readonly service: ProductsService
    ) { }

    @Post('new-price/validate')
    @ApiOperation({ summary: 'Valida a requisição para atualização de preços' })
    @HttpCode(200)
    @ApiBody({ type: NewPriceEntryPayload, isArray: true })
    public async returnDataFromTag(
        @Body(new ParseArrayPipe({ items: NewPriceEntryPayload })) payload: NewPriceEntryPayload[]) {
        return await this.service.validate(payload);
    }

    @Put('new-price/update')
    @ApiOperation({ summary: 'Realiza a requisição para atualização de preços' })
    @ApiBody({ type: NewPriceEntryPayload, isArray: true })
    public async updateValue(
        @Body(new ParseArrayPipe({ items: NewPriceEntryPayload })) payload: NewPriceEntryPayload[]) {
        return await this.service.update(payload);
    }
}
