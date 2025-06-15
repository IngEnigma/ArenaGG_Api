import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from '../dtos/request/create-tournament.dto';
import { TournamentRepository } from '../infrastructure/tournament.repository';

@Injectable()
export class CreateTournamentUseCase {
  constructor(private readonly tournamentRepo: TournamentRepository) {}

  async execute(dto: CreateTournamentDto) {
    return await this.tournamentRepo.create(dto);
  }
}
