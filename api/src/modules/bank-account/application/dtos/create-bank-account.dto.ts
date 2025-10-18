import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IBankAccountType } from '../../domain/enums/bank-account-type.enum';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(IBankAccountType)
  @IsNotEmpty()
  type: IBankAccountType;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;
}
