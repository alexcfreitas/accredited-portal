import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  dataService: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const statusService = {
      code: 200,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      method: request.method,
      message: 'success',
    };
    return next
      .handle()
      .pipe(map((dataService) => ({ dataService, statusService })));
  }
}
