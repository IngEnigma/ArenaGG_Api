import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { IRankingRepository } from '../interfaces/ranking-repository.interface';
import { RankingEntryDto } from '../dtos/response/response-ranking.dto';
import { mapEntityToDto, mapToRankingEntity } from './mappers/ranking.mapper';

@Injectable()
export class rankingRepository implements IRankingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getRankingByGame(
    gameName: string,
    page = 1,
    limit = 10,
  ): Promise<RankingEntryDto[]> {
    const skip = (page - 1) * limit;

    const rankings = await this.prisma.ranking.findMany({
      where: {
        gameName: gameName as any,
        user: {
          deletedAt: null,
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        points: 'desc',
      },
      skip,
      take: limit,
    });

    const globalRankings = await this.prisma.ranking.findMany({
      where: {
        gameName: gameName as any,
        user: {
          deletedAt: null,
        },
      },
      orderBy: {
        points: 'desc',
      },
      select: {
        userId: true,
      },
    });

    const globalUserIdToRank = new Map<number, number>();
    globalRankings.forEach((r, i) => globalUserIdToRank.set(r.userId, i + 1));

    const rankingEntities = await Promise.all(
      rankings.map((ranking) =>
        mapToRankingEntity(
          this.prisma,
          gameName,
          ranking,
          globalUserIdToRank.get(ranking.userId) ?? 0,
        ),
      ),
    );

    return rankingEntities.map(mapEntityToDto);
  }
}
