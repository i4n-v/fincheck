import { Injectable } from '@nestjs/common';
import { BankAccountEntity } from '../entities/bank-account.entity';

@Injectable()
export abstract class BankAccountRepository {
  abstract create(bankAccount: BankAccountEntity): Promise<BankAccountEntity>;
  abstract updateById(
    bankAccountId: string,
    updateData: Partial<BankAccountEntity>,
  ): Promise<BankAccountEntity>;
  abstract deleteById(bankAccountId: string): Promise<BankAccountEntity>;
  abstract findByIdAndUserId(
    bankAccountId: string,
    userId: string,
  ): Promise<BankAccountEntity | null>;
  abstract findAllByUserId(userId: string): Promise<BankAccountEntity[]>;
}
