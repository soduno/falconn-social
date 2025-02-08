import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddlewareMiddleware implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService
  ) { }

  use(req: Request, res: Response, next: NextFunction) {
    try {
      let bearer = req.get('authorization');
      if (!bearer) {
        throw new UnauthorizedException('Authorization header missing');
      }

      bearer = bearer.replace('Bearer ', '').trim();

      const payload = this.jwt.verify(bearer, { secret: process.env.API_SECRET_JWT });

      req['user'] = payload;

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
