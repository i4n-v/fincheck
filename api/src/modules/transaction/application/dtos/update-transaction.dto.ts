import {
  IsString,
  IsNumber,
  IsDateString,
  IsUUID,
  IsEnum,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { ITransactionType } from '../../domain/enums/transaction-type.enum';

export class UpdateTransactionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsEnum(ITransactionType)
  @IsNotEmpty()
  type: ITransactionType;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  bankAccountId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
