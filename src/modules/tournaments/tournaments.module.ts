import { Module } from '@nestjs/common';
import { TournamentController } from './controllers/tournament.controller';
import { FindAllTournamentsUseCase } from './usecase/find-all-tournaments.usecase';
import { CreateTournamentUseCase } from './usecase/create-tournament.usecase';
import { DeleteTournamentUseCase } from './usecase/delete-tournament.usecase';
import { TournamentRepository } from './infrastructure/tournament.repository';
import { PrismaService } from '../../database/prisma/prisma.service';
import { UpdateTournamentUseCase } from './usecase/update-tournament.usecase';

@Module({
  controllers: [TournamentController],
  providers: [
    FindAllTournamentsUseCase,
    CreateTournamentUseCase,
    TournamentRepository,
    PrismaService,
    FindAllTournamentsUseCase,
    UpdateTournamentUseCase,
    DeleteTournamentUseCase,
  ],
})
export class TournamentsModule {}
