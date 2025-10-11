import { DomainException } from 'src/commons/exceptions/domain.exception';
import { v4 } from 'uuid';

export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string, id?: string) {
    this.id = id || v4();

    if (!name) {
      throw new DomainException(
        UserEntity.name,
        'Name cannot be empty',
        'ERR_NAME_CANNOT_BE_EMPTY',
      );
    }

    if (!email) {
      throw new DomainException(
        UserEntity.name,
        'Email cannot be empty',
        'ERR_EMAIL_CANNOT_BE_EMPTY',
      );
    }

    if (!password) {
      throw new DomainException(
        UserEntity.name,
        'Password cannot be empty',
        'ERR_PASSWORD_CANNOT_BE_EMPTY',
      );
    }

    this.name = name;
    this.email = email;
    this.password = password;
  }
}
