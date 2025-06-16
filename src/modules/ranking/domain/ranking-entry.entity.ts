export class RankingEntry {
  constructor(
    public readonly username: string,
    public readonly points: number,
    public readonly tournamentsPlayed: number,
    public readonly tournamentsWon: number,
    public readonly rankPosition: number,
  ) {}

  isTopTen(): boolean {
    return this.rankPosition <= 10;
  }

  winRate(): number {
    return this.tournamentsPlayed > 0
      ? this.tournamentsWon / this.tournamentsPlayed
      : 0;
  }
}
