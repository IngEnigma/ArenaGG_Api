import { Controller, Get } from "@nestjs/common";
import { GetRankingByGameUseCase } from "../usecase/get-ranking-bt-game.usecase";

@Controller('rankings')
export class RankingsController {
    constructor(private readonly getRankingByGameUseCase: GetRankingByGameUseCase) {}

    @Get(':gameName')
    async getRankingByGame(gameName: string) {
        if (!gameName) {
            throw new Error("Game name is required");
        }
        
        return this.getRankingByGameUseCase.execute(gameName);
    }
}