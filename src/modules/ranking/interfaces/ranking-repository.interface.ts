import { RankingEntryDto } from "../dtos/response/response-ranking.dto"; 

export interface IRankingRepository {
  getRankingByGame(
    gameName: string,
    page?: number,
    limit?: number,
  ): Promise<RankingEntryDto[]>;
}