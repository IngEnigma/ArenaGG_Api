import {
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { PasswordService } from '../domain/services/password.service';
import { User } from '../domain/user.entity';
import { AppLogger } from 'src/common/utils/logger.service';

@Injectable()
export class LoginUserUseCase {
  private readonly context = LoginUserUseCase.name;

  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly passwordService: PasswordService,
    private readonly logger: AppLogger,
  ) {}

  async execute(username: string, password: string): Promise<User> {
    this.logger.log(`[execute] Intentando login para: ${username}`, this.context);

    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      this.logger.warn(`[execute] Usuario no encontrado: ${username}`, this.context);
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.passwordHash) {
      this.logger.error(`[execute] Usuario sin hash de contraseña: ${username}`, this.context);
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isValid = await this.passwordService.validatePassword(
      password,
      user.passwordHash,
    );

    if (!isValid) {
      this.logger.warn(`[execute] Contraseña inválida para usuario: ${username}`, this.context);
      throw new UnauthorizedException('Credenciales inválidas');
    }

    this.logger.log(`[execute] Login exitoso para: ${username}`, this.context);

    return user;
  }
}
