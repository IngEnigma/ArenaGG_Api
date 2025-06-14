import * as bcrypt from 'bcrypt';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppLogger } from 'src/common/utils/logger.service';

@Injectable()
export class PasswordService {
  private readonly context = PasswordService.name;

  constructor(private readonly logger: AppLogger) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      this.logger.error(
        'Error al hashear contraseña',
        error.stack,
        this.context,
      );
      throw new InternalServerErrorException('Error interno');
    }
  }

  async validatePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    try {
      console.log('[DEBUG] Password ingresado:', password);
      console.log('[DEBUG] Hash en base de datos:', passwordHash);

      const result = await bcrypt.compare(password, passwordHash);
      console.log('[DEBUG] Resultado de bcrypt.compare:', result);

      return result;
    } catch (error) {
      this.logger.error(
        'Error al validar contraseña',
        error.stack,
        this.context,
      );
      throw new InternalServerErrorException('Error al validar contraseña');
    }
  }
}
