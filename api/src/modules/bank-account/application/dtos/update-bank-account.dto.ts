import {
  IsEnum,
  IsHexColor,
  IsNumber,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IBankAccountType } from '../../domain/enums/bank-account-type.enum';

export class UpdateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(IBankAccountType)
  @IsNotEmpty()
  type: IBankAccountType;

  @IsString()
  @IsHexColor()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;
}
