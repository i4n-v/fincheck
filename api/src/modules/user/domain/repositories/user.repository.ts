import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export abstract class UserRepository {
  abstract create(user: UserEntity): Promise<UserEntity>;

  abstract findByEmail(email: string): Promise<UserEntity | null>;
}
