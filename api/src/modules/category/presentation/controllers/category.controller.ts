import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../application/use-cases/create-default-categories.use-case';
import { CreateCategoryDto } from '../../application/dtos/create-category.dto';
import { DomainException } from 'src/commons/exceptions/domain.exception';
import { ActiveUserId } from 'src/commons/decorators/active-user-id.decorator';
import { FindAllCategoriesByUserIdUseCase } from '../../application/use-cases/find-all-categories-by-user-id.use-case';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findAllCategoriesByUserIdUseCase: FindAllCategoriesByUserIdUseCase,
  ) {}

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

  @Get()
  async findAll(@ActiveUserId() userId: string) {
    return await this.findAllCategoriesByUserIdUseCase.execute(userId);
  }
}
