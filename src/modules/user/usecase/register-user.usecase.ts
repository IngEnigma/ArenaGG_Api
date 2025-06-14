import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dtos/internal/create-user.input';
import { User } from '../domain/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { PasswordService } from '../domain/services/password.service';
import { AppLogger } from 'src/common/utils/logger.service';

@Injectable()
export class RegisterUserUseCase {
  private readonly context = RegisterUserUseCase.name;

  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly passwordService: PasswordService,
    private readonly logger: AppLogger,
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    this.logger.log(`[execute] Iniciando registro para: ${input.email}`, this.context);

    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      this.logger.warn(`[execute] Email ya registrado: ${input.email}`, this.context);
      throw new ConflictException('El email ya está registrado');
    }

    const existingByUsername = await this.userRepository.findByUsername(input.username);
    if (existingByUsername) {
      this.logger.warn(`[execute] Username ya en uso: ${input.username}`, this.context);
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    const passwordHash = await this.passwordService.hashPassword(
      input.passwordHash,
    );

    const userToCreate: CreateUserInput = {
      email: input.email,
      username: input.username,
      passwordHash,
      role: input.role ?? 'user'
    };

    const createdUser = await this.userRepository.create(userToCreate);

    this.logger.log(`[execute] Usuario registrado con éxito: ${createdUser.email}`, this.context);
    return createdUser;
  }
}
