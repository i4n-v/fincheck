import { Injectable } from '@nestjs/common';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';

@Injectable()
export class FindAllBankAccountsByUserIdUseCase {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  async execute(userId: string) {
    return this.bankAccountRepository.findAllByUserId(userId);
  }
}
