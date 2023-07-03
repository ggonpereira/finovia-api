import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly transactionRepo: TransactionsRepository) {}

  async validate(userId: string, transactionId: string) {
    const transactionInfo = await this.transactionRepo.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });

    if (!transactionInfo || transactionInfo.userId !== userId) {
      throw new NotFoundException('Transaction not found');
    }

    return transactionInfo;
  }
}
