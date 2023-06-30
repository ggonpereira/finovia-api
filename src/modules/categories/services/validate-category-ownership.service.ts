import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async validate(userId: string, categoryId: string) {
    const categoryInfo = await this.categoriesRepo.findFirst({
      where: {
        userId,
        id: categoryId,
      },
    });

    if (!categoryInfo || categoryInfo.userId !== userId) {
      throw new NotFoundException('Category not found');
    }
  }
}
