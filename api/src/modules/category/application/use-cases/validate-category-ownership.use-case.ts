import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { DomainException } from 'src/commons/exceptions/domain.exception';

@Injectable()
export class ValidateCategoryOwnershipUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(userId: string, categoryId: string) {
    const category = await this.categoryRepository.findByIdAndUserId(
      categoryId,
      userId,
    );

    if (!category) {
      throw new DomainException(
        ValidateCategoryOwnershipUseCase.name,
        'Category not found',
        'ERR_CATEGORY_NOT_FOUND',
        404,
      );
    }
  }
}
