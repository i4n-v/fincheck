import { BankAccountModel } from '@prisma/client';
import { BankAccountEntity } from '../../domain/entities/bank-account.entity';
import { IBankAccountType } from '../../domain/enums/bank-account-type.enum';

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
}
