import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../application/use-cases/create-default-categories.use-case';
import { CreateCategoryDto } from '../../application/dtos/create-category.dto';
import { DomainException } from 'src/commons/exceptions/domain.exception';

@Controller('categories')
export class CategoryController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.createCategoryUseCase.execute(createCategoryDto);
    } catch (error) {
      if (error instanceof DomainException) {
        throw error.toHttpException();
      }

      throw error;
    }
  }
}
