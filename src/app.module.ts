import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { RankingModule } from './modules/ranking/ranking.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { AppLogger } from './common/utils/logger.service';
import { LoggerModule } from './common/logger.module';


@Module({
  imports: [UserModule, RankingModule, TournamentsModule, PrismaModule, PrismaModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService, AppLogger],
  exports: [AppLogger],
})
export class AppModule {}
