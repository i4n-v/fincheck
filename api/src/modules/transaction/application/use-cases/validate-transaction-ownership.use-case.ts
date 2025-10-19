import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { DomainException } from 'src/commons/exceptions/domain.exception';

@Injectable()
export class ValidateTransactionOwnershipUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(userId: string, transactionId: string) {
    const transaction = await this.transactionRepository.findByIdAndUserId(
      transactionId,
      userId,
    );

    if (!transaction) {
      throw new DomainException(
        ValidateTransactionOwnershipUseCase.name,
        'Transaction not found',
        'ERR_TRANSACTION_NOT_FOUND',
        404,
      );
    }
  }
}
