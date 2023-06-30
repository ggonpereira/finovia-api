import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(findManyDto: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.CategoryFindFirstArgs) {
    return this.prismaService.category.findFirst(findFirstDto);
  }

  create(createCategoryDto: Prisma.CategoryCreateArgs) {
    return this.prismaService.category.create(createCategoryDto);
  }

  update(updateCategoryDto: Prisma.CategoryUpdateArgs) {
    return this.prismaService.category.update(updateCategoryDto);
  }

  delete(deleteCategoryDto: Prisma.CategoryDeleteArgs) {
    return this.prismaService.category.delete(deleteCategoryDto);
  }
}
