import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateDto } from '../dtos/authenticate.dto';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(authenticateDto: AuthenticateDto) {
    const user = await this.userRepository.findByEmail(authenticateDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.validatePassword(
      authenticateDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return;
  }

  private validatePassword(password: string, storedPassword: string) {
    return bcrypt.compare(password, storedPassword);
  }
}
