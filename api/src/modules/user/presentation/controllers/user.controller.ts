import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { DomainException } from 'src/commons/exceptions/domain.exception';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.createUserUseCase.execute(createUserDto);
    } catch (error) {
      if (error instanceof DomainException) {
        throw error.toHttpException();
      }

      throw error;
    }
  }
}
