import { Injectable } from '@nestjs/common';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';
import { UpdateBankAccountDto } from '../dtos/update-bank-account.dto';
import { BankAccountEntity } from '../../domain/entities/bank-account.entity';
import { ValidateBankAccountOwnershipUseCase } from './validate-bank-account-ownership.use-case';

@Injectable()
export class UpdateBankAccountUseCase {
  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly validateBankAccountOwnershipUseCase: ValidateBankAccountOwnershipUseCase,
  ) {}

  async execute(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipUseCase.execute(
      userId,
      bankAccountId,
    );

    const bankAccountEntity = new BankAccountEntity(
      updateBankAccountDto.name,
      updateBankAccountDto.type,
      updateBankAccountDto.color,
      updateBankAccountDto.initialBalance,
      userId,
      bankAccountId,
    );

    return this.bankAccountRepository.updateById(
      bankAccountEntity.id,
      bankAccountEntity,
    );
  }
}
