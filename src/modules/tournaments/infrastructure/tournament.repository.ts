import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateTournamentDto } from '../dtos/request/create-tournament.dto';
import { TournamentMapper } from './mappers/tournament.mapper';

@Injectable()
export class TournamentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTournamentDto) {
    const tournament = await this.prisma.tournament.create({
      data: {
        name: dto.name,
        gameName: dto.gameName,
        startDate: new Date(dto.startDate),
        maxSlots: dto.maxSlots,
        mode: dto.mode,
        bracketType: dto.bracketType,
        status: dto.status,
        rules: dto.rules ?? null,
        requirements: dto.requirements ?? null,
        prizes: dto.prizes ?? null,
      },
    });

    return TournamentMapper.toDomain(tournament);
  }

  // (ya tenías `findAll()` si lo necesitas también)
}
