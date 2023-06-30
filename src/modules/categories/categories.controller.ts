import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAllByUserId(@ActiveUserId() userId: string) {
    return this.categoriesService.findAllByUserId(userId);
  }

  @Get(':id')
  findFirst(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) categoryId: string,
  ) {
    return this.categoriesService.findFirst(userId, categoryId);
  }

  // TODO: allow creation only for paid users
  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(userId, createCategoryDto);
  }

  // TODO: allow update only for paid users
  @Put(':id')
  update(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(userId, categoryId, updateCategoryDto);
  }

  // TODO: allow deletion only for paid users
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) categoryId: string,
  ) {
    return this.categoriesService.delete(userId, categoryId);
  }
}
