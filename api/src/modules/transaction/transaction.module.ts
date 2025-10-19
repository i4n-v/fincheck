import { Module } from '@nestjs/common';
import { TransactionController } from './presentation/controllers/transaction.controller';
import { TransactionRepository } from './domain/repositories/transaction.repository';
import { TransactionPrismaRepository } from './infrastructure/repositories/transaction.prisma.repository';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.use-case';
import { FindAllTransactionsByUserIdUseCase } from './application/use-cases/find-all-transactions-by-user-id.use-case';
import { UpdateTransactionUseCase } from './application/use-cases/update-transaction.use-case';
import { DeleteTransactionUseCase } from './application/use-cases/delete-transaction.use-case';
import { ValidateTransactionOwnershipUseCase } from './application/use-cases/validate-transaction-ownership.use-case';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [BankAccountModule, CategoryModule],
  controllers: [TransactionController],
  providers: [
    {
      provide: TransactionRepository,
      useClass: TransactionPrismaRepository,
    },
    CreateTransactionUseCase,
    FindAllTransactionsByUserIdUseCase,
    UpdateTransactionUseCase,
    DeleteTransactionUseCase,
    ValidateTransactionOwnershipUseCase,
  ],
})
export class TransactionModule {}
