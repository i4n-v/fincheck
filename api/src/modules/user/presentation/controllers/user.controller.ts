import { Controller, Get, Request } from '@nestjs/common';
import { DomainException } from 'src/commons/exceptions/domain.exception';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { ActiveUserId } from 'src/commons/decorators/active-user-id.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  @Get('me')
  async me(@ActiveUserId() userId: string) {
    try {
      return await this.getUserByIdUseCase.execute(userId);
    } catch (error) {
      if (error instanceof DomainException) {
        throw error.toHttpException();
      }

      throw error;
    }
  }
}
