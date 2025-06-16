export class TournamentResponseDto {
  id: number;
  name: string;
  gameName: string;
  startDate: Date;
  maxSlots: number;
  mode: string;
  rules: string | null;
  requirements: string | null;
  prizes: string | null;
  bracketType: string;
  status: string;
  createdAt: Date;
}
