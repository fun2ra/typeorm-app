import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.session.userId;

    const currentUser = await this.usersService.findOne(userId);

    console.log('Current User:', userId, currentUser);

    if (currentUser) {
      request.session.currentUser = currentUser;
      console.log('Request Current User:', request.session.currentUser);
    }

    return next.handle().pipe();
  }
}
