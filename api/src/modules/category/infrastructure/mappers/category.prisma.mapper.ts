import { CategoryModel } from '@prisma/client';
import {
  CategoryEntity,
  ITransactionType,
} from '../../domain/entities/category.entity';

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
