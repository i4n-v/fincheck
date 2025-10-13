import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';

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
      throw new BadRequestException('Category already exists');
    }

    return this.categoryRepository.create(categoryEntity);
  }
}
