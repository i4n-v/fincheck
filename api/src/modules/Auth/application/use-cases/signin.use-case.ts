import { Injectable } from '@nestjs/common';
import { DomainException } from 'src/commons/exceptions/domain.exception';
import { SigninDto } from '../dtos/signin.dto';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SigninUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(signinDto: SigninDto) {
    const user = await this.userRepository.findByEmail(signinDto.email);

    if (!user) {
      throw new DomainException(
        SigninUseCase.name,
        'Invalid credentials',
        'ERR_INVALID_CREDENTIALS',
        401,
      );
    }

    const isPasswordValid = await this.validatePassword(
      signinDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new DomainException(
        SigninUseCase.name,
        'Invalid credentials',
        'ERR_INVALID_CREDENTIALS',
        401,
      );
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return { accessToken };
  }

  private validatePassword(password: string, storedPassword: string) {
    return bcrypt.compare(password, storedPassword);
  }
}
