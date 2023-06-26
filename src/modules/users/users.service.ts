import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { defaultUserCategories } from './constants';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create({ email, name, password }: CreateUserDto) {
    const userExists = await this.usersRepo.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (userExists) {
      throw new ConflictException('This email is already in use.');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepo.create({
      data: {
        email,
        name,
        password: hashedPassword,
        categories: {
          createMany: {
            data: defaultUserCategories,
          },
        },
      },
    });

    return {
      email: user.email,
      name: user.name,
    };
  }
}
