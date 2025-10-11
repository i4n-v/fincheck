import { Controller, Get } from '@nestjs/common';
import { GetAppHelloUseCase } from '../../application/use-cases/get-app-hello.use-case';

@Controller()
export class AppController {
  constructor(private readonly getAppHelloUseCase: GetAppHelloUseCase) {}

  @Get()
  getHello(): string {
    return this.getAppHelloUseCase.execute();
  }
}
