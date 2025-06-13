import { User } from '../domain/user.entity';
import { CreateUserInput } from '../dtos/internal/create-user.input';

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  create(user: CreateUserInput): Promise<User>;
}
