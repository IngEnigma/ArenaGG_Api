import { Module } from '@nestjs/common';
import { AppLogger } from './logger/logger'; // Ajusta ruta si es necesario

@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class SharedModule {}
