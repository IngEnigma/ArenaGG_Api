import { User as DomainUser } from '../../domain/user.entity';
import { User as PrismaUser, Prisma, user_role } from '@prisma/client';
import { RegisterUserDto } from '../../dtos/request/register-user.dto';
import { CreateUserInput } from '../../dtos/internal/create-user.input';

export const UserMapper = {
  toDomain(prismaUser: PrismaUser): DomainUser {
    return new DomainUser({
      id: prismaUser.id,
      email: prismaUser.email,
      username: prismaUser.username,
      passwordHash: prismaUser.passwordHash,
      role: prismaUser.role,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      deletedAt: prismaUser.deletedAt,
    });
  },

  toPrisma(domainUser: DomainUser): Prisma.UserCreateInput {
    return {
      email: domainUser.email,
      username: domainUser.username,
      passwordHash: domainUser.passwordHash,
      role: domainUser.role,
    };
  },

  fromRegisterDto(dto: RegisterUserDto): CreateUserInput {
    return {
      email: dto.email,
      username: dto.username,
      passwordHash: dto.password,
      role: user_role.user, 
    };
  },
};
