import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAppHelloUseCase {
  execute(): string {
    return 'Hello World!';
  }
}
