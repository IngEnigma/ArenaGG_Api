import { IsOptional, IsString, IsDateString, IsInt, IsEnum } from 'class-validator';

export class UpdateTournamentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  gameName?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsInt()
  maxSlots?: number;

  @IsOptional()
  @IsString()
  mode?: string;

  @IsOptional()
  @IsString()
  rules?: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsString()
  prizes?: string;

  @IsOptional()
  @IsString()
  bracketType?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
