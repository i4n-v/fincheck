import { ConflictException, Injectable } from '@nestjs/common';
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
      throw new ConflictException('Email is already in use');
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
