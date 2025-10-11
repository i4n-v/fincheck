import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { DomainException } from 'src/commons/exceptions/domain.exception';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(createCategoryDto: CreateCategoryDto) {
    const categoryEntity = new CategoryEntity(
      createCategoryDto.name,
      createCategoryDto.icon,
      createCategoryDto.type,
      createCategoryDto.userId,
    );

    const categoryExists = await this.categoryRepository.findByNameAndUserId({
      name: categoryEntity.name,
      userId: categoryEntity.userId,
    });

    if (categoryExists) {
      throw new DomainException(
        CreateCategoryUseCase.name,
        'Category already exists',
        'ERR_CATEGORY_ALREADY_EXISTS',
      );
    }

    return this.categoryRepository.create(categoryEntity);
  }
}
