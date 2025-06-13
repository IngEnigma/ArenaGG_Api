import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { PasswordService } from '../domain/services/password.service';
import { User } from '../domain/user.entity';

@Injectable()
export class LoginUserUseCase {
  constructor( 
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isValid = await this.passwordService.validatePassword(
      password,
      user.passwordHash,
    );
    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return user;
  }
}
