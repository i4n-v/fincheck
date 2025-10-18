import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';

@Injectable()
export class ValidateBankAccountOwnershipUseCase {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  async execute(userId: string, bankAccountId: string) {
    const bankAccount = await this.bankAccountRepository.findByIdAndUserId(
      bankAccountId,
      userId,
    );

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found');
    }
  }
}
