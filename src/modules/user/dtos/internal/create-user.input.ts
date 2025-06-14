import { user_role } from '@prisma/client';

export class CreateUserInput {
  email: string;
  username: string;
  passwordHash: string;
  role: user_role;
}
