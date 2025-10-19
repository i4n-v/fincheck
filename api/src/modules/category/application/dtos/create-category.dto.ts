import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ITransactionType } from '../../../transaction/domain/enums/transaction-type.enum';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsEnum(ITransactionType)
  @IsNotEmpty()
  type: ITransactionType;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
