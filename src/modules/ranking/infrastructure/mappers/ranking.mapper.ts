// src/modules/ranking/infrastructure/mappers/ranking.mapper.ts
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Ranking, User } from '@prisma/client';
import { RankingEntry } from '../../domain/ranking-entry.entity'; 
import { RankingEntryDto } from '../../dtos/response/response-ranking.dto';

interface RankingWithUser extends Ranking {
  user: User;
}

export async function mapToRankingEntity(
  prisma: PrismaService,
  gameName: string,
  ranking: RankingWithUser,
  rankPosition: number,
): Promise<RankingEntry> {
  const tournamentsPlayed = await prisma.tournamentParticipant.count({
    where: {
      userId: ranking.userId,
      tournament: {
        gameName: gameName as any,
      },
    },
  });

  const tournamentsWon = await prisma.tournamentParticipant.count({
    where: {
      userId: ranking.userId,
      tournament: {
        gameName: gameName as any,
        status: 'closed',
        participants: {
          some: {
            userId: ranking.userId,
          },
        },
      },
    },
  });

  return new RankingEntry(
    ranking.user.username,
    ranking.points,
    tournamentsPlayed,
    tournamentsWon,
    rankPosition,
  );
}

export function mapEntityToDto(entity: RankingEntry): RankingEntryDto {
  return {
    username: entity.username,
    points: entity.points,
    tournamentsPlayed: entity.tournamentsPlayed,
    tournamentsWon: entity.tournamentsWon,
    rankPosition: entity.rankPosition,
  };
}