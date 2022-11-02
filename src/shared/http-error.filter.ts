import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const errorObject: any = exception.message || null;

    const errorResponse = {
      code: status,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      method: request.method,
      message: errorObject.error || exception.message || null,
    };

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'ExceptionFilter',
    );

    response
      .status(status)
      .json({ dataService: null, statusService: errorResponse });
  }
}
