import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable()
export class FindAllTransactionsByUserIdUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(userId: string) {
    const transactions =
      await this.transactionRepository.findAllByUserId(userId);

    return transactions;
  }
}
