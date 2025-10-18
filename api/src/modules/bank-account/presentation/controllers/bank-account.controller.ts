import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBankAccountUseCase } from '../../application/use-cases/create-bank-account.use-case';
import { UpdateBankAccountUseCase } from '../../application/use-cases/update-bank-account.use-case';
import { DeleteBankAccountUseCase } from '../../application/use-cases/delete-bank-account.use-case';
import { FindAllBankAccountsByUserIdUseCase } from '../../application/use-cases/find-all-bank-accounts-by-user-id.use-case';
import { CreateBankAccountDto } from '../../application/dtos/create-bank-account.dto';
import { UpdateBankAccountDto } from '../../application/dtos/update-bank-account.dto';
import { DomainException } from 'src/commons/exceptions/domain.exception';
import { ActiveUserId } from 'src/commons/decorators/active-user-id.decorator';

@Controller('bank-accounts')
export class BankAccountController {
  constructor(
    private readonly createBankAccountUseCase: CreateBankAccountUseCase,
    private readonly updateBankAccountUseCase: UpdateBankAccountUseCase,
    private readonly deleteBankAccountUseCase: DeleteBankAccountUseCase,
    private readonly findAllBankAccountsByUserIdUseCase: FindAllBankAccountsByUserIdUseCase,
  ) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.findAllBankAccountsByUserIdUseCase.execute(userId);
  }

  @Post()
  async create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountDto: CreateBankAccountDto,
  ) {
    try {
      return await this.createBankAccountUseCase.execute(
        userId,
        createBankAccountDto,
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
    @Param('id', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    try {
      return await this.updateBankAccountUseCase.execute(
        userId,
        bankAccountId,
        updateBankAccountDto,
      );
    } catch (error) {
      if (error instanceof DomainException) {
        throw error.toHttpException();
      }

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) bankAccountId: string,
  ) {
    try {
      await this.deleteBankAccountUseCase.execute(userId, bankAccountId);
    } catch (error) {
      if (error instanceof DomainException) {
        throw error.toHttpException();
      }

      throw error;
    }
  }
}
