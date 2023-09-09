import { Controller, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PacksService } from '../services/packs.service';

@ApiTags('packs')
@Controller('packs')
export class PacksController {

    constructor(
        private readonly service: PacksService
    ) { }

    // @Post('validate-new-price')
    // @ApiOperation({ summary: 'Valida a requisição para atualização de preços' })
    // @ApiBody({ type: NewPriceEntryPayload, isArray: true })
    // public async returnDataFromTag(
    //     @Body(new ParseArrayPipe({ items: NewPriceEntryPayload })) payload: NewPriceEntryPayload[]) {
    //     return await this.service.findAll(payload);
    // }
}
