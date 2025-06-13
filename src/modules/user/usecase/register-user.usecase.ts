import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dtos/internal/create-user.input';
import { User } from '../domain/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { PasswordService } from '../domain/services/password.service';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    const passwordHash = await this.passwordService.hashPassword(
      input.password,
    );

    const userToCreate = { ...input, passwordHash };
    return await this.userRepository.create(userToCreate);
  }
}
