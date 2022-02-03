import authConfg from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  name: string;
  email: string;
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfg.jwt.secret);

    const { sub, name, email } = decodeToken as ITokenPayload;
    request.user = {
      id: sub,
      name,
      email,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token');
  }
}
