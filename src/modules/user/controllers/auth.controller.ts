import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserUseCase } from '../usecase/register-user.usecase';
import { LoginUserUseCase } from '../usecase/login-user.usecase';
import { LoginUserDto } from '../dtos/request/login-user.dto';
import { UserResponseDto } from '../dtos/response/user-response.dto';
import { RegisterUserDto } from '../dtos/request/register-user.dto';
import { UserMapper } from '../infrastructure/mappers/user.mapper';
import { AuthService } from '../domain/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() input: RegisterUserDto): Promise<UserResponseDto> {
    try {
      const user = await this.registerUserUseCase.execute(
        UserMapper.fromRegisterDto(input),
      );

      const token = await this.authService.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        id: user.id.toString(),
        email: user.email,
        username: user.username,
        token,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error al registrar usuario',
      );
    }
  }

  @Post('login')
  async login(@Body() credentials: LoginUserDto): Promise<UserResponseDto> {
    try {
      const user = await this.loginUserUseCase.execute(
        credentials.username,
        credentials.password,
      );

      const token = await this.authService.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        id: user.id.toString(),
        email: user.email,
        username: user.username,
        token,
      };
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Credenciales inválidas',
      );
    }
  }
}
