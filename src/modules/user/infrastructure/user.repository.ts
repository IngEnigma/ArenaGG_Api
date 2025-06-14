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
    this.logger.log(`[findById] Buscando usuario por ID: ${id}`, this.context);
    try {
      const prismaUser = await this.prisma.user.findUnique({ where: { id } });
      return prismaUser ? UserMapper.toDomain(prismaUser) : null;
    } catch (error) {
      this.logger.error(
        `[findById] Error al buscar usuario por ID: ${id}`,
        error.stack,
        this.context,
      );
      throw new InternalServerErrorException('Error interno al buscar usuario');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.log(`[findByEmail] Buscando usuario por email: ${email}`, this.context);
    try {
      const prismaUser = await this.prisma.user.findUnique({
        where: { email },
      });
      return prismaUser ? UserMapper.toDomain(prismaUser) : null;
    } catch (error) {
      this.logger.error(
        `[findByEmail] Error al buscar usuario por email: ${email}`,
        error.stack,
        this.context,
      );
      throw new InternalServerErrorException('Error interno al buscar usuario');
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    this.logger.log(`[findByUsername] Buscando usuario por username: ${username}`, this.context);
    try {
      const prismaUser = await this.prisma.user.findUnique({
        where: { username },
      });
      return prismaUser ? UserMapper.toDomain(prismaUser) : null;
    } catch (error) {
      this.logger.error(
        `[findByUsername] Error al buscar usuario por username: ${username}`,
        error.stack,
        this.context,
      );
      throw new InternalServerErrorException('Error interno al buscar usuario');
    }
  }

  async create(data: CreateUserInput): Promise<User> {
    this.logger.log(`[create] Verificando existencia de usuario: ${data.email} / ${data.username}`, this.context);

    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: data.email },
            { username: data.username },
          ],
        },
      });

      if (existingUser) {
        this.logger.warn(
          `[create] Usuario ya existe: ${data.email} o ${data.username}`,
          this.context,
        );
        throw new ConflictException(
          'El correo electrónico o nombre de usuario ya está en uso',
        );
      }

      this.logger.log(`[create] Creando usuario: ${data.email}`, this.context);

      const prismaUser = await this.prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          passwordHash: data.passwordHash,
          role: data.role ?? 'USER',
        },
      });

      return UserMapper.toDomain(prismaUser);
    } catch (error) {
      this.logger.error(
        `[create] Error al crear usuario: ${data.email}`,
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
