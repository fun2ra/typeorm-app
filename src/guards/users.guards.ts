import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class UsersGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true;
  }
}
