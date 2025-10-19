import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { ValidateTransactionOwnershipUseCase } from './validate-transaction-ownership.use-case';

@Injectable()
export class DeleteTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly validateTransactionOwnershipUseCase: ValidateTransactionOwnershipUseCase,
  ) {}

  async execute(userId: string, transactionId: string) {
    await this.validateTransactionOwnershipUseCase.execute(
      userId,
      transactionId,
    );

    await this.transactionRepository.deleteById(transactionId);
  }
}
