import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';
import { ValidateTransactionOwnershipService } from './services/verify-transactions.service';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/verify-bank-accounts.service';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-category-ownership.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ValidateBankAccountOwnershipService,
    ValidateCategoryOwnershipService,
    ValidateTransactionOwnershipService,
  ],
})
export class TransactionsModule {}
