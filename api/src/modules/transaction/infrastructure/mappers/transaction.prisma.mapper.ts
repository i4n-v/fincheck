import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { TransactionModel } from '@prisma/client';
import { ITransactionType } from '../../domain/enums/transaction-type.enum';

export class TransactionPrismaMapper {
  static toTransactionEntity(
    transactionModel: TransactionModel,
  ): TransactionEntity {
    return new TransactionEntity(
      transactionModel.name,
      transactionModel.value,
      transactionModel.date,
      transactionModel.type as ITransactionType,
      transactionModel.userId,
      transactionModel.bankAccountId,
      transactionModel.categoryId || undefined,
      transactionModel.id,
    );
  }
}
