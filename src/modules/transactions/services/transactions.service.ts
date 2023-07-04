import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/verify-bank-accounts.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './verify-transactions.service';
import { TransactionType } from 'src/modules/categories/dto/create-category.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnership: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnership: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnership: ValidateTransactionOwnershipService,
  ) {}

  findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    return this.transactionsRepo.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
        type: filters.type,
        bankAccountId: filters.bankAccountId,
      },
    });
  }

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, date, name, type, value, categoryId } =
      createTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
    });

    return this.transactionsRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, date, name, type, value, categoryId } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
    });

    return this.transactionsRepo.update({
      where: {
        id: transactionId,
      },
      data: {
        bankAccountId,
        date,
        name,
        type,
        value,
        categoryId,
      },
    });
  }

  async delete(userId: string, transactionId: string) {
    await this.validateTransactionOwnership.validate(userId, transactionId);

    await this.transactionsRepo.delete({
      where: {
        id: transactionId,
      },
    });

    return {
      status: HttpStatus.NO_CONTENT,
    };
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnership.validate(userId, transactionId),
      bankAccountId &&
        this.validateBankAccountOwnership.validate(userId, bankAccountId),
      categoryId && this.validateCategoryOwnership.validate(userId, categoryId),
    ]);
  }
}
