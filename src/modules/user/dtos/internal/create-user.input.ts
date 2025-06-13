import { user_role } from '@prisma/client';

export class CreateUserInput {
  email: string;
  username: string;
  password: string;
  role: user_role;
}
