import { Module } from '@nestjs/common';
import { BankAccountController } from './presentation/controllers/bank-account.controller';
import { BankAccountRepository } from './domain/repositories/bank-account.repository';
import { BankAccountPrismaRepository } from './infrastructure/repositories/bank-account.prisma.repository';

@Module({
  controllers: [BankAccountController],
  providers: [
    {
      provide: BankAccountRepository,
      useClass: BankAccountPrismaRepository,
    },
  ],
  exports: [BankAccountRepository],
})
export class BankAccountModule {}
