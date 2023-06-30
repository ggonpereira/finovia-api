import { HttpStatus, Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ValidateCategoryOwnershipService } from './validate-category-ownership.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepo: CategoriesRepository,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}

  findAllByUserId(userId: string) {
    return this.categoriesRepo.findMany({
      where: {
        userId,
      },
    });
  }

  async findFirst(userId: string, categoryId: string) {
    const categoryInfo = await this.validateCategoryOwnershipService.validate(
      userId,
      categoryId,
    );

    return categoryInfo;
  }

  create(userId: string, createCategoryDto: CreateCategoryDto) {
    const { icon, name, type } = createCategoryDto;

    return this.categoriesRepo.create({
      data: {
        icon,
        name,
        type,
        userId,
      },
    });
  }

  async update(
    userId: string,
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const { icon, name, type } = updateCategoryDto;

    await this.validateCategoryOwnershipService.validate(userId, categoryId);

    return this.categoriesRepo.update({
      where: {
        id: categoryId,
      },
      data: {
        icon,
        name,
        type,
      },
    });
  }

  async delete(userId: string, categoryId: string) {
    await this.validateCategoryOwnershipService.validate(userId, categoryId);

    await this.categoriesRepo.delete({
      where: {
        id: categoryId,
      },
    });

    return {
      status: HttpStatus.NO_CONTENT,
    };
  }
}
