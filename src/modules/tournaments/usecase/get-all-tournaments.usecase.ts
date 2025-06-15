import { Injectable, Inject } from '@nestjs/common';
import { ITournamentRepository } from '../interfaces/tournament-repository.interface';
import { Tournament } from '../domain/entities/tournament.entity';

@Injectable()
export class GetAllTournamentsUseCase {
  constructor(
    @Inject('ITournamentRepository') private readonly repo: ITournamentRepository,
  ) {}

  async execute(): Promise<Tournament[]> {
    return await this.repo.findAll();
  }
}
