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
import { AppLogger } from 'src/common/utils/logger.service';

@Controller('auth')
export class AuthController {
  private readonly context = AuthController.name;

  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly authService: AuthService,
    private readonly logger: AppLogger,
  ) {}

  @Post('register')
  async register(@Body() input: RegisterUserDto): Promise<UserResponseDto> {
    this.logger.log(
      `[register] Intentando registrar: ${input.email}`,
      this.context,
    );

    try {
      const user = await this.registerUserUseCase.execute(
        UserMapper.fromRegisterDto(input),
      );

      const token = await this.authService.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      this.logger.log(
        `[register] Usuario registrado: ${user.email}`,
        this.context,
      );

      return {
        id: user.id.toString(),
        email: user.email,
        username: user.username,
        token,
      };
    } catch (error) {
      this.logger.error(
        `[register] Error al registrar usuario`,
        error.stack,
        this.context,
      );
      throw new BadRequestException('No se pudo completar el registro');
    }
  }

  @Post('login')
  async login(@Body() credentials: LoginUserDto): Promise<UserResponseDto> {
    this.logger.log(
      `[login] Intentando login: ${credentials.username}`,
      this.context,
    );

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

      this.logger.log(
        `[login] Login exitoso para: ${user.username}`,
        this.context,
      );

      return {
        id: user.id.toString(),
        email: user.email,
        username: user.username,
        token,
      };
    } catch (error) {
      this.logger.warn(
        `[login] Fallo en login para: ${credentials.username}`,
        this.context,
      );
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
}
