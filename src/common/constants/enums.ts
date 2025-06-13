export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum TournamentMode {
  SOLO = 'solo',
  TEAM = 'team',
}

export enum TournamentStatus {
  OPEN = 'open',
  PROGRESS = 'progress',
  CLOSED = 'closed',
}

export enum BracketType {
  SINGLE_ELIMINATION = 'singleElimination',
  DOUBLE_ELIMINATION = 'doubleElimination',
  FREE_FOR_ALL = 'freeForAll',
  ROUND_ROBIN = 'roundRobin',
  SWISS = 'swiss',
  LEADERBOARD = 'leaderboard',
}

export enum GameName {
  LEAGUE_OF_LEGENDS = 'leagueOfLegends',
  ROCKET_LEAGUE = 'rocketLeague',
  COUNTER_STRIKE = 'counterStrike',
  VALORANT = 'valorant',
}
