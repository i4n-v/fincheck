import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { ITransactionType } from '../../domain/enums/transaction-type.enum';

export class FindAllTransactionsQueryDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  month: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  year: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  bankAccountId?: string;

  @IsString()
  @IsEnum(ITransactionType)
  @IsOptional()
  type?: ITransactionType;
}
