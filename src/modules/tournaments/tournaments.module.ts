import { Module } from '@nestjs/common';
import { TournamentsController } from './controllers/tournaments.controller';
import { AdminTournamentsController } from './controllers/admin-tournaments.controller';
import { CreateTournamentUseCase } from './use-cases/create_tournament.usecase';
import { UpdateTournamentUseCase } from './use-cases/update_tournament.usecase';
import { DeleteTournamentUseCase } from './use-cases/delete_tournament.usecase';
import { GetTournamentByIdUseCase } from './use-cases/get_tournament_by_id.usecase';
import { PrismaTournamentRepository } from './infra/prisma/tournament.repository';
import { GetBasicTournamentsUseCase } from './use-cases/get_basic_tournament.usecase';
import { SubscribeTeamToTournamentUseCase } from './use-cases/subscribe_team_tournament.usecase';
import { SubscribeUserToTournamentUseCase } from './use-cases/subscribe_user_tournament.usecase';
import { UnsubscribeTeamFromTournamentUseCase } from './use-cases/unsubscribe_team_tournement.usecase';
import { UnsubscribeUserFromTournamentUseCase } from './use-cases/unsubscribe_user_tournament.usecase';
import { FindTournamentByNameAndGameUseCase } from './use-cases/get_tournament_by_name_and_game.usecase';
import { SharedModule } from '../../common/shared.module';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { AppLogger } from 'src/common/logger/logger';
import { TOURNAMENT_REPOSITORY } from './interfaces/tournament.repository';
import { LoggerModule } from '../../common/logger.module';

@Module({
  imports: [SharedModule, PrismaModule, LoggerModule],
  controllers: [TournamentsController, AdminTournamentsController],
  providers: [
    {
      provide: TOURNAMENT_REPOSITORY,
      useClass: PrismaTournamentRepository,
    },
    CreateTournamentUseCase,
    UpdateTournamentUseCase,
    DeleteTournamentUseCase,
    GetTournamentByIdUseCase,
    GetBasicTournamentsUseCase,
    SubscribeTeamToTournamentUseCase,
    SubscribeUserToTournamentUseCase,
    UnsubscribeTeamFromTournamentUseCase,
    UnsubscribeUserFromTournamentUseCase,
    FindTournamentByNameAndGameUseCase,
    PrismaTournamentRepository,
    AppLogger,
  ],
})
export class TournamentsModule {}
