export class Tournament {
  id: number;
  gameName: string;
  name: string;
  startDate: Date;
  maxSlots: number;
  mode: string;
  rules?: string;
  requirements?: string;
  prizes?: string;
  bracketType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(props: Partial<Tournament>) {
    Object.assign(this, props);
  }
}
