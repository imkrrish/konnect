import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    return req.cookies && req.cookies['__session']
      ? super.canActivate(context)
      : false;
  }
}
