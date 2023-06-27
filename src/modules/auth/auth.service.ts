import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { SignUpDto } from './dto/sign-up.dto';
import { defaultUserCategories } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp({ email, name, password }: SignUpDto) {
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

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signIn({ email, password }: SignInDto) {
    const user = await this.usersRepo.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private async generateAccessToken(userId: string) {
    return await this.jwtService.signAsync({ sub: userId });
  }
}
