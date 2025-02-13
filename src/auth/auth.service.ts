import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // async login(user: any): Promise<{ access_token: string }> {
  //   return { access_token: this.generateToken(user) }; // ❌ Aquí no hay await, pero no es necesario.
  // }

  verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
