import { HttpException, Logger } from '@nestjs/common';

export class DomainException extends Error {
  public readonly source: string;
  public readonly name: string;
  public readonly code: string;
  public readonly statusCode: number;
  private readonly logger = new Logger(DomainException.name);

  constructor(
    source: string,
    message: string,
    code: string,
    statusCode: number = 400,
  ) {
    super(message);
    this.name = 'DomainException';
    this.source = source;
    this.code = code;
    this.statusCode = statusCode;

    this.logError();
  }

  logError() {
    const payload = {
      name: this.name,
      source: this.source,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
    };

    this.logger.error(this.source, JSON.stringify(payload, null, 2));
  }

  toHttpException(): HttpException {
    return new HttpException(
      { message: this.message, code: this.code },
      this.statusCode,
    );
  }
}
