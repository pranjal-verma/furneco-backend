import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    // private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
      return false; // Token missing or invalid format
    }
    const jwtToken = token.split(' ')[1];
    try {
      const decodedToken = this.jwtService.verify(jwtToken);
      console.log('request', request.params, decodedToken);
      if (decodedToken.id == request.params.id) {
        return true;
      }
    } catch (error) {
      return false; // Token verification failed
    }
    return false;
  }
}
