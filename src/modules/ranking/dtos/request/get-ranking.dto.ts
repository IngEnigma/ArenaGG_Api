import { IsEnum } from 'class-validator';
import { GameName } from 'src/common/constants/enums'; 

export class GetRankingDto {
  @IsEnum(GameName)
  gameName: GameName;
}
