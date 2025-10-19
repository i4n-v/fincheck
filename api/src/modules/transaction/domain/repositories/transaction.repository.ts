import { Injectable } from '@nestjs/common';
import { TransactionEntity } from '../entities/transaction.entity';

@Injectable()
export abstract class TransactionRepository {
  abstract create(transaction: TransactionEntity): Promise<TransactionEntity>;
  abstract updateById(
    transactionId: string,
    updateData: Partial<TransactionEntity>,
  ): Promise<TransactionEntity>;
  abstract deleteById(transactionId: string): Promise<TransactionEntity>;
  abstract findByIdAndUserId(
    transactionId: string,
    userId: string,
  ): Promise<TransactionEntity | null>;
  abstract findAllByUserId(userId: string): Promise<TransactionEntity[]>;
  abstract findAllByBankAccountId(
    bankAccountId: string,
    userId: string,
  ): Promise<TransactionEntity[]>;
}
