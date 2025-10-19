import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { ValidateTransactionOwnershipUseCase } from './validate-transaction-ownership.use-case';
import { ValidateBankAccountOwnershipUseCase } from 'src/modules/bank-account/application/use-cases/validate-bank-account-ownership.use-case';
import { ValidateCategoryOwnershipUseCase } from 'src/modules/category/application/use-cases/validate-category-ownership.use-case';

@Injectable()
export class UpdateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly validateTransactionOwnershipUseCase: ValidateTransactionOwnershipUseCase,
    private readonly validateBankAccountOwnershipUseCase: ValidateBankAccountOwnershipUseCase,
    private readonly validateCategoryOwnershipUseCase: ValidateCategoryOwnershipUseCase,
  ) {}

  async execute(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.validateTransactionOwnershipUseCase.execute(
      userId,
      transactionId,
    );

    await this.validateBankAccountOwnershipUseCase.execute(
      userId,
      updateTransactionDto.bankAccountId,
    );

    await this.validateCategoryOwnershipUseCase.execute(
      userId,
      updateTransactionDto.categoryId,
    );

    const transactionEntity = new TransactionEntity(
      updateTransactionDto.name,
      updateTransactionDto.value,
      new Date(updateTransactionDto.date),
      updateTransactionDto.type,
      userId,
      updateTransactionDto.bankAccountId,
      updateTransactionDto.categoryId,
    );

    const transaction = await this.transactionRepository.updateById(
      transactionId,
      transactionEntity,
    );

    return transaction;
  }
}
