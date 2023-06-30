import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;
}
