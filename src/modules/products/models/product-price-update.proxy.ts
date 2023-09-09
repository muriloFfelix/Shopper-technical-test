import { ApiProperty } from '@nestjs/swagger';

export class ProductPriceUpdateProxy {

  //#region Public Properties

  @ApiProperty()
  product_code: number;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  current_price?: string;

  @ApiProperty()
  new_price?: string;

  @ApiProperty()
  errors?: string[];

  //#endregion

}