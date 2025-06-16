import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTournamentDto } from '../dto/update_tournament.dto';
import { Tournament } from '../entities/tournament.entity';
import { AppLogger } from '../../../common/logger/logger'; 
import { TOURNAMENT_REPOSITORY, TournamentRepository } from '../interfaces/tournament.repository';

@Injectable()
export class UpdateTournamentUseCase {
  constructor(
     @Inject(TOURNAMENT_REPOSITORY)
    private readonly tournamentRepository: TournamentRepository,
    private readonly logger: AppLogger, 
  ) {
    this.logger.setContext(UpdateTournamentUseCase.name);  
  }

  async execute(id: number, data: UpdateTournamentDto): Promise<Tournament> {
    this.logger.log('Executing tournament update', { tournamentId: id, updateData: data });  

    const existing = await this.tournamentRepository.findTournamentById(id);
    if (!existing) {
      this.logger.warn('Tournament not found', { tournamentId: id });
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }

    this.logger.log('Tournament found, proceeding with update', { tournamentId: id });

    const updatedTournament = await this.tournamentRepository.updateTournament(id, data);
    this.logger.log('Tournament updated successfully', { tournamentId: updatedTournament.id });

    return updatedTournament;
  }
}
