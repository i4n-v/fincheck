import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { UserPrismaRepository } from './infrastructure/repositories/user-prisma.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    CreateUserUseCase,
  ],
})
export class UserModule {}
