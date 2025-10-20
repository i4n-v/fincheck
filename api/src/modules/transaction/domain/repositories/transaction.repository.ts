import { Injectable } from '@nestjs/common';
import { TransactionEntity } from '../entities/transaction.entity';
import { ITransactionType } from '../enums/transaction-type.enum';

export interface IFindAllByUserIdFilters {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: ITransactionType;
}

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
  abstract findAllByUserId(
    userId: string,
    filters: IFindAllByUserIdFilters,
  ): Promise<TransactionEntity[]>;
  abstract findAllByBankAccountId(
    bankAccountId: string,
    userId: string,
  ): Promise<TransactionEntity[]>;
}
