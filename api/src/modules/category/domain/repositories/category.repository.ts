import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../entities/category.entity';

export interface IFindByNameAndUserIdParams {
  name: string;
  userId: string;
}

@Injectable()
export abstract class CategoryRepository {
  abstract create(category: CategoryEntity): Promise<CategoryEntity>;
  abstract createMany(categories: CategoryEntity[]): Promise<CategoryEntity[]>;
  abstract findByNameAndUserId(
    params: IFindByNameAndUserIdParams,
  ): Promise<CategoryEntity | null>;
  abstract findAllByUserId(userId: string): Promise<CategoryEntity[]>;
}
