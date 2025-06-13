import { Global, Module } from '@nestjs/common';
import { AppLogger } from './utils/logger.service';

@Global()
@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {}
