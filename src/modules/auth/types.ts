import { TransactionType } from '@prisma/client';

export interface UserCategories {
  name: string;
  icon: string;
  type: TransactionType;
}
