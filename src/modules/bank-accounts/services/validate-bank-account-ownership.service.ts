import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './verify-bank-accounts.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto;

    return this.bankAccountsRepo.create({
      data: {
        color,
        initialBalance,
        name,
        type,
        userId,
      },
    });
  }

  findAll(userId: string) {
    return this.bankAccountsRepo.findMany({
      where: {
        userId,
      },
    });
  }

  async findFirst(userId: string, bankAccountId: string) {
    return await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    const { color, name, type, initialBalance } = updateBankAccountDto;

    const bankAccountUpdatedInfo = await this.bankAccountsRepo.update({
      data: {
        color,
        name,
        type,
        initialBalance,
      },
      where: {
        id: bankAccountId,
      },
    });

    return bankAccountUpdatedInfo;
  }

  async delete(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    await this.bankAccountsRepo.delete({
      where: {
        id: bankAccountId,
      },
    });

    return {
      status: HttpStatus.NO_CONTENT,
    };
  }
}
