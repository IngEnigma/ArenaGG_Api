import { user_role } from '@prisma/client';

export class User {
  id: number;
  email: string;
  username: string;
  passwordHash: string;
  role: user_role;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
