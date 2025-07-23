import { NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export class UserSerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {}
}
