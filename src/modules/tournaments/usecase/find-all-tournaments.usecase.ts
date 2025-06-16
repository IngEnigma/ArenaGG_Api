// modules/tournament/usecase/find-all-tournaments.usecase.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { TournamentResponseDto } from '../dtos/response/tournament-response.dto';

@Injectable()
export class FindAllTournamentsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<TournamentResponseDto[]> {
    const tournaments = await this.prisma.tournament.findMany({
      orderBy: { startDate: 'asc' },
    });

    return tournaments.map(t => ({
      id: t.id,
      name: t.name,
      gameName: t.gameName,
      startDate: t.startDate,
      maxSlots: t.maxSlots,
      mode: t.mode,
      rules: t.rules,
      requirements: t.requirements,
      prizes: t.prizes,
      bracketType: t.bracketType,
      status: t.status,
      createdAt: t.createdAt,
    }));
  }
}
