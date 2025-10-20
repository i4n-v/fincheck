import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { FindAllTransactionsQueryDto } from '../dtos/find-all-transactions-query.dto';

@Injectable()
export class FindAllTransactionsByUserIdUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(userId: string, queryDto: FindAllTransactionsQueryDto) {
    const transactions = await this.transactionRepository.findAllByUserId(
      userId,
      queryDto,
    );

    return transactions;
  }
}
