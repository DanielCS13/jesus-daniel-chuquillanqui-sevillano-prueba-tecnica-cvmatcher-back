import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any; // Puedes definir una mejor tipificación según tu `payload`
}

export interface Payload {
  sub: string;
  email: string;
  role: string;
  iat: number;
}
