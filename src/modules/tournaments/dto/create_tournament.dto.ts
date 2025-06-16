import {
    IsString,
    IsDateString,
    IsEnum,
    IsInt,
    Min,
  } from 'class-validator';
  import { GameName } from '../../../common/enums/game_name.enum';
  import { TournamentMode } from '../../../common/enums/tournament_mode.enum';
  import { BracketType } from '../../../common/enums/bracket_type.enum';
  import { TournamentStatus } from '../../../common/enums/tournament_status.enum';
  
  export class CreateTournamentDto {
    @IsEnum(GameName)
    gameName: GameName;
  
    @IsString()
    name: string;
  
    @IsDateString()
    startDate: string;
  
    @IsInt()
    @Min(2)
    maxSlots: number;
  
    @IsEnum(TournamentMode)
    mode: TournamentMode;
  
    @IsEnum(BracketType)
    bracketType: BracketType;
  
    @IsEnum(TournamentStatus)
    status: TournamentStatus;
  
    @IsString()
    rules: string;
  
    @IsString()
    requirements: string;
  
    @IsString()
    prizes: string;
  }
  