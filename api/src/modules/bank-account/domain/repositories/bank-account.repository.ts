import { Injectable } from '@nestjs/common';
import { BankAccountEntity } from '../entities/bank-account.entity';

@Injectable()
export abstract class BankAccountRepository {
  // Repository methods will be added here
}
