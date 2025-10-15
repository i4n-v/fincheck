import { Controller, Post, Body } from '@nestjs/common';
import { SigninDto } from '../../application/dtos/signin.dto';
import { SigninUseCase } from '../../application/use-cases/signin.use-case';
import { SignupDto } from '../../application/dtos/signup.dto';
import { SignupUseCase } from '../../application/use-cases/signup.use-case';
import { DomainException } from 'src/commons/exceptions/domain.exception';
import { IsPublic } from 'src/commons/decorators/is-public.decorator';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signinUseCase: SigninUseCase,
    private readonly signupUseCase: SignupUseCase,
  ) {}

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    return await this.signinUseCase.execute(signinDto);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    try {
      return await this.signupUseCase.execute(signupDto);
    } catch (error) {
      if (error instanceof DomainException) {
        throw error.toHttpException();
      }

      throw error;
    }
  }
}
