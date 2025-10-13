import { CategoryModel } from '@prisma/client';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { ITransactionType } from '../../domain/enums/transaction-type.enum';

export class CategoryPrismaMapper {
  static toCategoryEntity(model: CategoryModel): CategoryEntity {
    return new CategoryEntity(
      model.name,
      model.icon,
      model.type as ITransactionType,
      model.userId,
      model.id,
    );
  }
}
