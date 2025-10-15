import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { UserPrismaRepository } from './infrastructure/repositories/user.prisma.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    GetUserByIdUseCase,
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
