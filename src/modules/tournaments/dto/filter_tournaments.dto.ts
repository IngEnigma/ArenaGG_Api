import { IsEnum, IsOptional } from 'class-validator';
import { GameName } from '../../../common/enums/game_name.enum';
import { TournamentStatus } from '../../../common/enums/tournament_status.enum';
import { DateFilter } from '../../../common/enums/date_filter.enum';

export class FilterTournamentsDto {
  @IsOptional()
  @IsEnum(GameName)
  gameName?: GameName;

  @IsOptional()
  @IsEnum(TournamentStatus)
  status?: TournamentStatus;

  @IsOptional()
  @IsEnum(DateFilter)
  dateFilter?: DateFilter;
}
