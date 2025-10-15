import { Injectable } from '@nestjs/common';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';
import { PrismaService } from 'src/configs/database/prisma/prisma.service';

@Injectable()
export class BankAccountPrismaRepository implements BankAccountRepository {
  constructor(private readonly prismService: PrismaService) {}

  // Repository methods will be implemented here
}
