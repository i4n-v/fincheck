import { DomainException } from 'src/commons/exceptions/domain.exception';
import { v4 } from 'uuid';

export class BankAccountEntity {
  id: string;
  name: string;
  type: string;
  color: string;
  userId: string;

  constructor(
    name: string,
    type: string,
    color: string,
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
    this.userId = userId;
  }
}
