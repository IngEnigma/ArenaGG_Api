import { IsEnum, IsInt, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { tournament_mode, bracket_type, tournament_status, game_name } from '@prisma/client';

export class CreateTournamentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(game_name)
  gameName: game_name;

  @IsISO8601()
  startDate: string; // se convertirá a Date en el servicio

  @IsInt()
  maxSlots: number;

  @IsEnum(tournament_mode)
  mode: tournament_mode;

  @IsEnum(bracket_type)
  bracketType: bracket_type;

  @IsEnum(tournament_status)
  status: tournament_status;

  @IsOptional()
  @IsString()
  rules?: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsString()
  prizes?: string;
}
