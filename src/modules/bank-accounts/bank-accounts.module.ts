import { Module } from '@nestjs/common';
import { BankAccountsService } from './services/validate-bank-account-ownership.service';
import { BankAccountsController } from './bank-accounts.controller';
import { ValidateBankAccountOwnershipService } from './services/verify-bank-accounts.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateBankAccountOwnershipService],
  exports: [ValidateBankAccountOwnershipService],
})
export class BankAccountsModule {}
