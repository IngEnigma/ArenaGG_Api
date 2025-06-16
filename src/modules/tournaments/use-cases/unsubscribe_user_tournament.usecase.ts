import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TOURNAMENT_REPOSITORY, TournamentRepository } from '../interfaces/tournament.repository';
import { AppLogger } from '../../../common/logger/logger';

@Injectable()
export class UnsubscribeUserFromTournamentUseCase {
  constructor(
    @Inject(TOURNAMENT_REPOSITORY)
    private readonly tournamentRepository: TournamentRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UnsubscribeUserFromTournamentUseCase.name);
  }

  async execute(userId: number, tournamentId: number): Promise<void> {
    this.logger.log('Executing UnsubscribeUserFromTournamentUseCase', { userId, tournamentId });

    const tournament = await this.tournamentRepository.findTournamentById(tournamentId);
    if (!tournament) {
      this.logger.warn('Tournament not found', { tournamentId });
      throw new NotFoundException('El torneo no existe');
    }

    const existingSubscription = await this.tournamentRepository.findUserSubscription(userId, tournamentId);
    if (!existingSubscription) {
      this.logger.warn('User not subscribed to tournament', { userId, tournamentId });
      throw new BadRequestException('El usuario no está inscrito en este torneo');
    }

    await this.tournamentRepository.unsubscribeUserFromTournament(userId, tournamentId);

    this.logger.log('User unsubscribed from tournament successfully', { userId, tournamentId });
  }
}
