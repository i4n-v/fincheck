import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PrismaService } from 'src/configs/database/prisma/prisma.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserPrismaMapper } from '../mappers/user-prisma.mapper';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prismService: PrismaService) {}

  async create(user: UserEntity) {
    const userModel = await this.prismService.userModel.create({ data: user });

    const userEntity = UserPrismaMapper.toUserEntity(userModel);

    return userEntity;
  }

  async findByEmail(email: string) {
    const userModel = await this.prismService.userModel.findUnique({
      where: { email },
    });

    if (!userModel) return null;

    const userEntity = UserPrismaMapper.toUserEntity(userModel);

    return userEntity;
  }
}
