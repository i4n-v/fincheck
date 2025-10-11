import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

interface ErrorPayload {
  message?: string;
  ErrorCode?: string;
  code?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const payload: ErrorPayload | null =
      exception instanceof HttpException
        ? (exception.getResponse() as ErrorPayload)
        : null;

    const message =
      payload?.message ||
      (exception instanceof Error ? exception.message : 'Unexpected error');

    const code =
      payload?.ErrorCode || payload?.code || this.mapStatusToCode(status);

    response.status(status).json({
      data: null,
      meta: null,
      error: {
        code,
        message,
        statusCode: status,
      },
    });
  }

  private mapStatusToCode(status: HttpStatus): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'ERR_BAD_REQUEST';
      case HttpStatus.UNAUTHORIZED:
        return 'ERR_UNAUTHORIZED';
      case HttpStatus.FORBIDDEN:
        return 'ERR_FORBIDDEN';
      case HttpStatus.NOT_FOUND:
        return 'ERR_NOT_FOUND';
      case HttpStatus.CONFLICT:
        return 'ERR_CONFLICT';
      default:
        return 'ERR_INTERNAL';
    }
  }
}
