import { DomainException } from 'src/commons/exceptions/domain.exception';
import { v4 } from 'uuid';
import { IBankAccountType } from '../enums/bank-account-type.enum';

export class BankAccountEntity {
  id: string;
  name: string;
  type: IBankAccountType;
  color: string;
  initialBalance: number;
  userId: string;

  constructor(
    name: string,
    type: IBankAccountType,
    color: string,
    initialBalance: number,
    userId: string,
    id?: string,
  ) {
    this.id = id || v4();

    if (!name) {
      throw new DomainException(
        BankAccountEntity.name,
        'Name cannot be empty',
        'ERR_NAME_CANNOT_BE_EMPTY',
      );
    }

    if (!type) {
      throw new DomainException(
        BankAccountEntity.name,
        'Type cannot be empty',
        'ERR_TYPE_CANNOT_BE_EMPTY',
      );
    }

    if (!color) {
      throw new DomainException(
        BankAccountEntity.name,
        'Color cannot be empty',
        'ERR_COLOR_CANNOT_BE_EMPTY',
      );
    }

    if (initialBalance === undefined || initialBalance === null) {
      throw new DomainException(
        BankAccountEntity.name,
        'Initial balance cannot be empty',
        'ERR_INITIAL_BALANCE_CANNOT_BE_EMPTY',
      );
    }

    if (!userId) {
      throw new DomainException(
        BankAccountEntity.name,
        'User ID cannot be empty',
        'ERR_USER_ID_CANNOT_BE_EMPTY',
      );
    }

    this.name = name;
    this.type = type;
    this.color = color;
    this.initialBalance = initialBalance;
    this.userId = userId;
  }
}
