import { Injectable } from '@nestjs/common';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';
import { ValidateBankAccountOwnershipUseCase } from './validate-bank-account-ownership.use-case';

@Injectable()
export class DeleteBankAccountUseCase {
  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly validateBankAccountOwnershipUseCase: ValidateBankAccountOwnershipUseCase,
  ) {}

  async execute(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipUseCase.execute(
      userId,
      bankAccountId,
    );

    return this.bankAccountRepository.deleteById(bankAccountId);
  }
}
