import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from 'src/commons/events/user-created.event';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(createUserDto.password);

    const userEntity = new UserEntity(
      createUserDto.name,
      createUserDto.email,
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

    return user;
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }
}
