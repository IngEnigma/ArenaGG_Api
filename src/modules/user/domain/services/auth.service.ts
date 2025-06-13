import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: { id: number; email: string; role: string }): Promise<string> {
    return this.jwtService.signAsync({
      sub: payload.id,
      email: payload.email,
      role: payload.role,
    });
  }
}
