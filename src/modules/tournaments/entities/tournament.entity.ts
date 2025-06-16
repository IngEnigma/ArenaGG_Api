import { TournamentStatus } from '../../../common/enums/tournament_status.enum';
import { TournamentMode } from '../../../common/enums/tournament_mode.enum';
import { BracketType } from '../../../common/enums/bracket_type.enum';
import { GameName } from '../../../common/enums/game_name.enum';

export class Tournament {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly game: GameName,
    public readonly startDate: Date,
    public readonly maxSlots: number,
    public readonly mode: TournamentMode,
    public readonly rules: string,
    public readonly requirements: string,
    public readonly prizes: string,
    public readonly bracket: BracketType,
    public readonly participants: string[],
    public readonly status: TournamentStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

