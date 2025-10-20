import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CreateTransactionDto } from '../../application/dtos/create-transaction.dto';
import { UpdateTransactionDto } from '../../application/dtos/update-transaction.dto';
import { CreateTransactionUseCase } from '../../application/use-cases/create-transaction.use-case';
import { FindAllTransactionsByUserIdUseCase } from '../../application/use-cases/find-all-transactions-by-user-id.use-case';
import { UpdateTransactionUseCase } from '../../application/use-cases/update-transaction.use-case';
import { DeleteTransactionUseCase } from '../../application/use-cases/delete-transaction.use-case';
import { ActiveUserId } from 'src/commons/decorators/active-user-id.decorator';
import { DomainException } from 'src/commons/exceptions/domain.exception';
import { FindAllTransactionsQueryDto } from '../../application/dtos/find-all-transactions-query.dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly findAllTransactionsByUserIdUseCase: FindAllTransactionsByUserIdUseCase,
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase,
  ) {}

  @Post()
  async create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    try {
      return await this.createTransactionUseCase.execute(
        userId,
        createTransactionDto,
      );
    } catch (error) {
      if (error instanceof DomainException) {
        throw error.toHttpException();
      }
      throw error;
    }
  }

  @Get()
  async findAll(
    @ActiveUserId() userId: string,
    @Query() queryDto: FindAllTransactionsQueryDto,
  ) {
    try {
      return await this.findAllTransactionsByUserIdUseCase.execute(
        userId,
        queryDto,
      );
    } catch (error) {
      if (error instanceof DomainException) {
        throw error.toHttpException();
      }
      throw error;
    }
  }

  @Put(':id')
  async update(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    try {
      return await this.updateTransactionUseCase.execute(
        userId,
        transactionId,
        updateTransactionDto,
      );
    } catch (error) {
      if (error instanceof DomainException) {
        throw error.toHttpException();
      }
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) transactionId: string,
  ) {
    try {
      return await this.deleteTransactionUseCase.execute(userId, transactionId);
    } catch (error) {
      if (error instanceof DomainException) {
        throw error.toHttpException();
      }
      throw error;
    }
  }
}
