import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from '../dtos/user.dto';

export function UserSerializeInterceptor() {
  return UseInterceptors(ClassSerializerInterceptor, UserInterceptor);
}

export class UserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<UserDto>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const serializedUser = new UserDto(data);
        console.log('Serializing user data:', data, serializedUser);

        return serializedUser;
      }),
    );
  }
}
