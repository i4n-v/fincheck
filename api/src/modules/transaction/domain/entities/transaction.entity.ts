import { DomainException } from 'src/commons/exceptions/domain.exception';
import { v4 } from 'uuid';
import { ITransactionType } from '../enums/transaction-type.enum';

export class TransactionEntity {
  id: string;
  name: string;
  value: number;
  date: Date;
  type: ITransactionType;
  userId: string;
  bankAccountId: string;
  categoryId?: string;

  constructor(
    name: string,
    value: number,
    date: Date,
    type: ITransactionType,
    userId: string,
    bankAccountId: string,
    categoryId?: string,
    id?: string,
  ) {
    this.id = id || v4();

    if (!name) {
      throw new DomainException(
        TransactionEntity.name,
        'Name cannot be empty',
        'ERR_NAME_CANNOT_BE_EMPTY',
      );
    }

    if (!value) {
      throw new DomainException(
        TransactionEntity.name,
        'Value cannot be empty',
        'ERR_VALUE_CANNOT_BE_EMPTY',
      );
    }

    if (!date) {
      throw new DomainException(
        TransactionEntity.name,
        'Date cannot be empty',
        'ERR_DATE_CANNOT_BE_EMPTY',
      );
    }

    if (!type) {
      throw new DomainException(
        TransactionEntity.name,
        'Type cannot be empty',
        'ERR_TYPE_CANNOT_BE_EMPTY',
      );
    }

    if (!userId) {
      throw new DomainException(
        TransactionEntity.name,
        'User ID cannot be empty',
        'ERR_USER_ID_CANNOT_BE_EMPTY',
      );
    }

    if (!bankAccountId) {
      throw new DomainException(
        TransactionEntity.name,
        'Bank Account ID cannot be empty',
        'ERR_BANK_ACCOUNT_ID_CANNOT_BE_EMPTY',
      );
    }

    this.name = name;
    this.value = value;
    this.date = date;
    this.type = type;
    this.userId = userId;
    this.bankAccountId = bankAccountId;
    this.categoryId = categoryId;
  }
}
