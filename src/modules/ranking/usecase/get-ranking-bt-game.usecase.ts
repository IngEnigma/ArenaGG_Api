import { Injectable } from "@nestjs/common";
import { IRankingRepository } from "../interfaces/ranking-repository.interface";
import { RankingEntryDto } from "../dtos/response/response-ranking.dto";

@Injectable()
export class GetRankingByGameUseCase {
    constructor(private readonly rankingRepository: IRankingRepository) {}
    async execute(gameName: string): Promise<RankingEntryDto[]> {
        if (!gameName) {
            throw new Error("Game name is required");
        }
        return this.rankingRepository.getRankingByGame(gameName);
    }
}