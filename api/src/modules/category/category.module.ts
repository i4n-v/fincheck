import { Module } from '@nestjs/common';
import { CategoryController } from './presentation/controllers/category.controller';
import { CategoryPrismaRepository } from './infrastructure/repositories/category.prisma.repository';
import { CategoryRepository } from './domain/repositories/category.repository';
import { CreateCategoryUseCase } from './application/use-cases/create-default-categories.use-case';
import { CreateDefaultCategoriesUseCase } from './application/use-cases/create-category.use-case';
import { FindAllCategoriesByUserIdUseCase } from './application/use-cases/find-all-categories-by-user-id.use-case';
import { ValidateCategoryOwnershipUseCase } from './application/use-cases/validate-category-ownership.use-case';

@Module({
  controllers: [CategoryController],
  providers: [
    {
      provide: CategoryRepository,
      useClass: CategoryPrismaRepository,
    },
    CreateCategoryUseCase,
    CreateDefaultCategoriesUseCase,
    FindAllCategoriesByUserIdUseCase,
    ValidateCategoryOwnershipUseCase,
  ],
  exports: [ValidateCategoryOwnershipUseCase],
})
export class CategoryModule {}
