import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository) {}

  async validate(userId: string, bankAccountId: string) {
    const bankAccountInfo = await this.bankAccountsRepo.findFirst({
      where: {
        id: bankAccountId,
        userId,
      },
    });

    if (!bankAccountInfo || bankAccountInfo.userId !== userId) {
      throw new NotFoundException('Bank account not found');
    }

    return bankAccountInfo;
  }
}
