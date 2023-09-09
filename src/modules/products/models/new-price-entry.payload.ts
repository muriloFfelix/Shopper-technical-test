import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsDefined, IsEmail, IsEmpty, IsNotEmpty, IsNumber, MinLength, ValidateIf, isDefined, } from 'class-validator';

export class NewPriceEntryPayload {

  //#region Public Properties

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário enviar o código de todos os produto' })
  product_code: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário enviar o novo preço de todos os produtos' })
  @IsDecimal({ decimal_digits: '1,2' }, { message: 'O campo novo preço deve estar no formato decimal' })
  new_price: string;

  //#endregion

}