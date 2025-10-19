import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { PrismaService } from 'src/configs/database/prisma/prisma.service';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { TransactionPrismaMapper } from '../mappers/transaction.prisma.mapper';

@Injectable()
export class TransactionPrismaRepository implements TransactionRepository {
  constructor(private readonly prismService: PrismaService) {}

  async create(transaction: TransactionEntity) {
    const transactionModel = await this.prismService.transactionModel.create({
      data: transaction,
    });

    return TransactionPrismaMapper.toTransactionEntity(transactionModel);
  }

  async updateById(
    transactionId: string,
    transaction: Partial<TransactionEntity>,
  ) {
    const transactionModel = await this.prismService.transactionModel.update({
      where: {
        id: transactionId,
      },
      data: transaction,
    });

    return TransactionPrismaMapper.toTransactionEntity(transactionModel);
  }

  async deleteById(transactionId: string) {
    const transactionModel = await this.prismService.transactionModel.delete({
      where: {
        id: transactionId,
      },
    });

    return TransactionPrismaMapper.toTransactionEntity(transactionModel);
  }

  async findByIdAndUserId(transactionId: string, userId: string) {
    const transactionModel = await this.prismService.transactionModel.findFirst(
      {
        where: { id: transactionId, userId },
      },
    );

    if (!transactionModel) return null;

    return TransactionPrismaMapper.toTransactionEntity(transactionModel);
  }

  async findAllByUserId(userId: string) {
    const transactionModels = await this.prismService.transactionModel.findMany(
      {
        where: { userId },
      },
    );

    return transactionModels.map(TransactionPrismaMapper.toTransactionEntity);
  }

  async findAllByBankAccountId(bankAccountId: string, userId: string) {
    const transactionModels = await this.prismService.transactionModel.findMany(
      {
        where: { bankAccountId, userId },
      },
    );

    return transactionModels.map(TransactionPrismaMapper.toTransactionEntity);
  }
}
