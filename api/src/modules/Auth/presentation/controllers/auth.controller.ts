import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticateDto } from '../../application/dtos/authenticate.dto';
import { AuthenticateUseCase } from '../../application/use-cases/authenticate.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  @Post('signin')
  async authenticate(@Body() authenticateDto: AuthenticateDto) {
    return await this.authenticateUseCase.execute(authenticateDto);
  }
}
