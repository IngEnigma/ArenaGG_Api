import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from '../domain/user.entity';
import { CreateUserInput } from '../dtos/internal/create-user.input';
import { UserMapper } from './mappers/user.mapper';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { AppLogger } from 'src/common/utils/logger.service';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly context = UserRepository.name;

  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: AppLogger,
  ) {}

  async findById(id: number): Promise<User | null> {
    this.logger.log(`Buscando usuario por ID: ${id}`, this.context);
    try {
      const prismaUser = await this.prisma.user.findUnique({ where: { id } });
      return prismaUser ? UserMapper.toDomain(prismaUser) : null;
    } catch (error) {
      this.logger.error(
        `Error al buscar usuario por ID: ${id}`,
        error.stack,
        this.context,
      );
      throw new InternalServerErrorException('Error interno al buscar usuario');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.log(`Buscando usuario por email: ${email}`, this.context);
    try {
      const prismaUser = await this.prisma.user.findUnique({
        where: { email },
      });
      return prismaUser ? UserMapper.toDomain(prismaUser) : null;
    } catch (error) {
      this.logger.error(
        `Error al buscar usuario por email: ${email}`,
        error.stack,
        this.context,
      );
      throw new InternalServerErrorException('Error interno al buscar usuario');
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    this.logger.log(`Buscando usuario por username: ${username}`, this.context);
    try {
      const prismaUser = await this.prisma.user.findUnique({
        where: { username },
      });
      return prismaUser ? UserMapper.toDomain(prismaUser) : null;
    } catch (error) {
      this.logger.error(
        `Error al buscar usuario por username: ${username}`,
        error.stack,
        this.context,
      );
      throw new InternalServerErrorException('Error interno al buscar usuario');
    }
  }

  async create(data: CreateUserInput): Promise<User> {
    this.logger.log(`Creando usuario: ${data.email}`, this.context);
    try {
      const passwordHash = await bcrypt.hash(data.password, 10);

      const prismaUser = await this.prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          passwordHash,
          role: data.role,
        },
      });

      return UserMapper.toDomain(prismaUser);
    } catch (error) {
      this.logger.error(
        `Error al crear usuario: ${data.email}`,
        error.stack,
        this.context,
      );

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'El correo electrónico o nombre de usuario ya está en uso',
        );
      }

      throw new InternalServerErrorException('No se pudo crear el usuario');
    }
  }
}
