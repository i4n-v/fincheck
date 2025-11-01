import { BankAccountModel, Prisma } from '@prisma/client';
import { BankAccountEntity } from '../../domain/entities/bank-account.entity';
import { IBankAccountType } from '../../domain/enums/bank-account-type.enum';
import { TransactionPrismaMapper } from 'src/modules/transaction/infrastructure/mappers/transaction.prisma.mapper';

type BankAccountModelWithTransactions = Prisma.BankAccountModelGetPayload<{
  include: { transactions: true };
}>;

export class BankAccountPrismaMapper {
  static toBankAccountEntity(model: BankAccountModel): BankAccountEntity {
    return new BankAccountEntity(
      model.name,
      model.type as IBankAccountType,
      model.color,
      model.initialBalance,
      model.userId,
      model.id,
    );
  }

  static toBankAccountEntityWithTransactions(
    model: BankAccountModelWithTransactions,
  ): BankAccountEntity {
    const transactions = model.transactions.map((transaction) =>
      TransactionPrismaMapper.toTransactionEntity(transaction),
    );

    return new BankAccountEntity(
      model.name,
      model.type as IBankAccountType,
      model.color,
      model.initialBalance,
      model.userId,
      model.id,
      transactions,
    );
  }
}
