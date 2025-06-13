import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RegisterUserUseCase } from './usecase/register-user.usecase';
import { LoginUserUseCase } from './usecase/login-user.usecase';
import { PasswordService } from './domain/services/password.service';
import { UserRepository } from './infrastructure/user.repository';
import { AuthService } from './domain/services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    PasswordService,
    AuthService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [RegisterUserUseCase, LoginUserUseCase, PasswordService, AuthService],
  controllers: [AuthController],
})
export class UserModule {}
