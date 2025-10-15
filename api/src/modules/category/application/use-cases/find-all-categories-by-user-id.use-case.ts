import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';

@Injectable()
export class FindAllCategoriesByUserIdUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(userId: string) {
    const categories = await this.categoryRepository.findAllByUserId(userId);
    return categories;
  }
}
