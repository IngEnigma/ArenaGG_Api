import { Tournament } from '../domain/entities/tournament.entity';

export interface ITournamentRepository {
  create(data: Partial<Tournament>): Promise<Tournament>;
  findAll(): Promise<Tournament[]>;
}
