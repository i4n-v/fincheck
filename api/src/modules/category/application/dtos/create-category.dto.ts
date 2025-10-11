import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ITransactionType } from '../../domain/entities/category.entity';

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
