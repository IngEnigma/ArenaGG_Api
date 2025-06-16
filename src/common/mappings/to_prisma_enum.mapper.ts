import { game_name, bracket_type, tournament_mode, tournament_status } from '@prisma/client';
import { GameName } from '../enums/game_name.enum';
import { BracketType } from '../enums/bracket_type.enum';
import { TournamentMode } from '../enums/tournament_mode.enum';
import { TournamentStatus } from '../enums/tournament_status.enum';

/** Convierte enums DTO a enums de Prisma (respetando casing real) **/

export const toPrismaGameName = (game: GameName): game_name => {
  const map = {
    League_of_Legends: game_name.leagueOfLegends,
    Rocket_League: game_name.rocketLeague,
    Counter_Strike: game_name.counterStrike,
    Valorant: game_name.valorant,
  };
  const result = map[game];
  if (!result) throw new Error(`Invalid game name: ${game}`);
  return result;
};

export const toPrismaBracketType = (bracket: BracketType): bracket_type => {
  const map = {
    Single_Elimination: bracket_type.singleElimination,
    Double_Elimination: bracket_type.doubleElimination,
    Free_For_All: bracket_type.freeForAll,
    Round_Robin: bracket_type.roundRobin,
    Swiss: bracket_type.swiss,
    Leaderboard: bracket_type.leaderboard,
  };
  const result = map[bracket];
  if (!result) throw new Error(`Invalid bracket type: ${bracket}`);
  return result;
};

export const toPrismaTournamentMode = (mode: TournamentMode): tournament_mode => {
  const map = {
    Solo: tournament_mode.solo,
    Team: tournament_mode.team,
  };
  const result = map[mode];
  if (!result) throw new Error(`Invalid tournament mode: ${mode}`);
  return result;
};

export const toPrismaTournamentStatus = (status: TournamentStatus): tournament_status => {
  const map = {
    Open: tournament_status.open,
    Progress: tournament_status.progress,
    Closed: tournament_status.closed,
  };
  const result = map[status];
  if (!result) throw new Error(`Invalid status: ${status}`);
  return result;
};
