import { UserModel } from '@prisma/client';
import { UserEntity } from '../../domain/entities/user.entity';

export class UserPrismaMapper {
  static toUserEntity(model: UserModel): UserEntity {
    return new UserEntity(model.name, model.email, model.password, model.id);
  }
}
