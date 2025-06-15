import { Module } from '@nestjs/common';
import { TournamentController } from './controllers/tournament.controller';
import { CreateTournamentUseCase } from './usecase/create-tournament.usecase';
import { TournamentRepository } from './infrastructure/tournament.repository';
import { PrismaService } from '../../database/prisma/prisma.service';

@Module({
  controllers: [TournamentController],
  providers: [
    CreateTournamentUseCase,
    TournamentRepository,
    PrismaService,
  ],
})
export class TournamentsModule {}
