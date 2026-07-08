import jwt, { type SignOptions } from 'jsonwebtoken';
import type { JwtPayload } from '@vaultway/shared';
import { env } from '../config/env';

type TokenClaims = Omit<JwtPayload, 'type'>;

export function signAccessToken(claims: TokenClaims): string {
  return jwt.sign({ ...claims, type: 'access' }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
  } as SignOptions);
}

export function signRefreshToken(claims: TokenClaims): string {
  return jwt.sign({ ...claims, type: 'refresh' }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  } as SignOptions);
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
}
