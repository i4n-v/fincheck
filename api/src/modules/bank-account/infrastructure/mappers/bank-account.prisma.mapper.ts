import { BankAccountEntity } from '../../domain/entities/bank-account.entity';
import { BankAccountModel } from '@prisma/client';

export class BankAccountPrismaMapper {
  static toBankAccountEntity(
    bankAccountModel: BankAccountModel,
  ): BankAccountEntity {
    return new BankAccountEntity(
      bankAccountModel.name,
      bankAccountModel.type,
      bankAccountModel.color,
      bankAccountModel.userId,
      bankAccountModel.id,
    );
  }
}
