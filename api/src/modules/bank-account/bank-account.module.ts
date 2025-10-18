import { Module } from '@nestjs/common';
import { BankAccountController } from './presentation/controllers/bank-account.controller';
import { BankAccountRepository } from './domain/repositories/bank-account.repository';
import { BankAccountPrismaRepository } from './infrastructure/repositories/bank-account.prisma.repository';
import { CreateBankAccountUseCase } from './application/use-cases/create-bank-account.use-case';
import { UpdateBankAccountUseCase } from './application/use-cases/update-bank-account.use-case';
import { DeleteBankAccountUseCase } from './application/use-cases/delete-bank-account.use-case';
import { FindAllBankAccountsByUserIdUseCase } from './application/use-cases/find-all-bank-accounts-by-user-id.use-case';
import { ValidateBankAccountOwnershipUseCase } from './application/use-cases/validate-bank-account-ownership.use-case';

@Module({
  controllers: [BankAccountController],
  providers: [
    {
      provide: BankAccountRepository,
      useClass: BankAccountPrismaRepository,
    },
    CreateBankAccountUseCase,
    UpdateBankAccountUseCase,
    DeleteBankAccountUseCase,
    FindAllBankAccountsByUserIdUseCase,
    ValidateBankAccountOwnershipUseCase,
  ],
  exports: [ValidateBankAccountOwnershipUseCase],
})
export class BankAccountModule {}
