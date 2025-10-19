import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { ValidateBankAccountOwnershipUseCase } from 'src/modules/bank-account/application/use-cases/validate-bank-account-ownership.use-case';
import { ValidateCategoryOwnershipUseCase } from 'src/modules/category/application/use-cases/validate-category-ownership.use-case';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly validateBankAccountOwnershipUseCase: ValidateBankAccountOwnershipUseCase,
    private readonly validateCategoryOwnershipUseCase: ValidateCategoryOwnershipUseCase,
  ) {}

  async execute(userId: string, createTransactionDto: CreateTransactionDto) {
    const transactionEntity = new TransactionEntity(
      createTransactionDto.name,
      createTransactionDto.value,
      new Date(createTransactionDto.date),
      createTransactionDto.type,
      userId,
      createTransactionDto.bankAccountId,
      createTransactionDto.categoryId,
    );

    await this.validateBankAccountOwnershipUseCase.execute(
      transactionEntity.userId,
      transactionEntity.bankAccountId,
    );

    await this.validateCategoryOwnershipUseCase.execute(
      transactionEntity.userId,
      transactionEntity.categoryId!,
    );

    const transaction =
      await this.transactionRepository.create(transactionEntity);

    return transaction;
  }
}
