import { Injectable } from '@nestjs/common';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';
import { PrismaService } from 'src/configs/database/prisma/prisma.service';
import { BankAccountEntity } from '../../domain/entities/bank-account.entity';
import { BankAccountPrismaMapper } from '../mappers/bank-account.prisma.mapper';
import { ITransactionType } from 'src/modules/transaction/domain/enums/transaction-type.enum';

@Injectable()
export class BankAccountPrismaRepository implements BankAccountRepository {
  constructor(private readonly prismService: PrismaService) {}

  async create(bankAccount: Omit<BankAccountEntity, 'transactions'>) {
    const bankAccountModel = await this.prismService.bankAccountModel.create({
      data: bankAccount,
    });

    return BankAccountPrismaMapper.toBankAccountEntity(bankAccountModel);
  }

  async updateById(
    bankAccountId: string,
    updateData: Partial<Omit<BankAccountEntity, 'transactions'>>,
  ) {
    const bankAccountModel = await this.prismService.bankAccountModel.update({
      where: {
        id: bankAccountId,
      },
      data: updateData,
    });

    return BankAccountPrismaMapper.toBankAccountEntity(bankAccountModel);
  }

  async deleteById(bankAccountId: string) {
    const bankAccountModel = await this.prismService.bankAccountModel.delete({
      where: {
        id: bankAccountId,
      },
    });

    return BankAccountPrismaMapper.toBankAccountEntity(bankAccountModel);
  }

  async findByIdAndUserId(bankAccountId: string, userId: string) {
    const bankAccountModel = await this.prismService.bankAccountModel.findFirst(
      {
        where: { id: bankAccountId, userId },
      },
    );

    if (!bankAccountModel) return null;

    return BankAccountPrismaMapper.toBankAccountEntity(bankAccountModel);
  }

  async findAllByUserId(userId: string) {
    const bankAccountModels = await this.prismService.bankAccountModel.findMany(
      {
        where: { userId },
        include: {
          transactions: true,
        },
      },
    );

    const banckAccounts = bankAccountModels.map((bankAccountModel) => {
      const { transactions, ...bankAccount } =
        BankAccountPrismaMapper.toBankAccountEntityWithTransactions(
          bankAccountModel,
        );

      const totalTransactions = transactions!.reduce(
        (currentBalance, transaction) => {
          if (transaction.type === ITransactionType.INCOME) {
            return currentBalance + transaction.value;
          }

          return currentBalance - transaction.value;
        },
        0,
      );

      return {
        ...bankAccount,
        currentBalance: totalTransactions + bankAccount.initialBalance,
      };
    });

    return banckAccounts;
  }
}
