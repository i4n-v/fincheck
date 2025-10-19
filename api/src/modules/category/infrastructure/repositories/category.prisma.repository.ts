import { Injectable } from '@nestjs/common';
import {
  CategoryRepository,
  IFindByNameAndUserIdParams,
} from '../../domain/repositories/category.repository';
import { PrismaService } from 'src/configs/database/prisma/prisma.service';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryPrismaMapper } from '../mappers/category.prisma.mapper';

@Injectable()
export class CategoryPrismaRepository implements CategoryRepository {
  constructor(private readonly prismService: PrismaService) {}

  async create(category: CategoryEntity) {
    const categoryModel = await this.prismService.categoryModel.create({
      data: category,
    });

    const categoryEntity = CategoryPrismaMapper.toCategoryEntity(categoryModel);

    return categoryEntity;
  }

  async createMany(categories: CategoryEntity[]) {
    await this.prismService.categoryModel.createMany({
      data: categories,
    });

    const userIds = categories.map((category) => category.userId);

    const categoryModels = await this.prismService.categoryModel.findMany({
      where: {
        userId: {
          in: userIds,
        },
      },
    });

    const categoryEntities = categoryModels.map(
      CategoryPrismaMapper.toCategoryEntity,
    );

    return categoryEntities;
  }

  async findByNameAndUserId({ name, userId }: IFindByNameAndUserIdParams) {
    const categoryModel = await this.prismService.categoryModel.findFirst({
      where: { name, userId },
    });

    if (!categoryModel) return null;

    return CategoryPrismaMapper.toCategoryEntity(categoryModel);
  }

  async findAllByUserId(userId: string) {
    const categoryModels = await this.prismService.categoryModel.findMany({
      where: { userId },
    });

    return categoryModels.map(CategoryPrismaMapper.toCategoryEntity);
  }

  async findByIdAndUserId(categoryId: string, userId: string) {
    const categoryModel = await this.prismService.categoryModel.findFirst({
      where: { id: categoryId, userId },
    });

    if (!categoryModel) return null;

    return CategoryPrismaMapper.toCategoryEntity(categoryModel);
  }
}
