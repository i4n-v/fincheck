import { Injectable } from '@nestjs/common';
import { DomainException } from 'src/commons/exceptions/domain.exception';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { SignupDto } from '../dtos/signup.dto';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from 'src/commons/events/user-created.event';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly jwtService: JwtService,
  ) {}

  async execute(signupDto: SignupDto) {
    const hashedPassword = await this.hashPassword(signupDto.password);

    const userEntity = new UserEntity(
      signupDto.name,
      signupDto.email,
      hashedPassword,
    );

    const emailIsAlreadyInUse = await this.userRepository.findByEmail(
      userEntity.email,
    );

    if (emailIsAlreadyInUse) {
      throw new DomainException(
        SignupUseCase.name,
        'Email is already in use',
        'ERR_EMAIL_ALREADY_IN_USE',
        409,
      );
    }

    const user = await this.userRepository.create(userEntity);

    this.eventEmitter.emit(
      UserCreatedEvent.eventName,
      new UserCreatedEvent(user.id),
    );

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return { accessToken };
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  private async;
}
