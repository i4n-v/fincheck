import { Injectable } from '@nestjs/common';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';
import { BankAccountEntity } from '../../domain/entities/bank-account.entity';
import { CreateBankAccountDto } from '../dtos/create-bank-account.dto';

@Injectable()
export class CreateBankAccountUseCase {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  async execute(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const bankAccount = new BankAccountEntity(
      createBankAccountDto.name,
      createBankAccountDto.type,
      createBankAccountDto.color,
      Number(createBankAccountDto.initialBalance),
      userId,
    );

    return this.bankAccountRepository.create(bankAccount);
  }
}
