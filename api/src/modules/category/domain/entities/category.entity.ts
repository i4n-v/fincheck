import { DomainException } from 'src/commons/exceptions/domain.exception';
import { v4 } from 'uuid';
import { ITransactionType } from '../../../transaction/domain/enums/transaction-type.enum';

export class CategoryEntity {
  id: string;
  name: string;
  icon: string;
  type: ITransactionType;
  userId: string;

  constructor(
    name: string,
    icon: string,
    type: ITransactionType,
    userId: string,
    id?: string,
  ) {
    this.id = id || v4();

    if (!name) {
      throw new DomainException(
        CategoryEntity.name,
        'Name cannot be empty',
        'ERR_NAME_CANNOT_BE_EMPTY',
      );
    }

    if (!icon) {
      throw new DomainException(
        CategoryEntity.name,
        'Icon cannot be empty',
        'ERR_ICON_CANNOT_BE_EMPTY',
      );
    }

    if (!type) {
      throw new DomainException(
        CategoryEntity.name,
        'Type cannot be empty',
        'ERR_TYPE_CANNOT_BE_EMPTY',
      );
    }

    if (!userId) {
      throw new DomainException(
        CategoryEntity.name,
        'User ID cannot be empty',
        'ERR_USER_ID_CANNOT_BE_EMPTY',
      );
    }

    this.name = name;
    this.icon = icon;
    this.type = type;
    this.userId = userId;
  }
}
