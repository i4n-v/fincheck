import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { GetAppHelloUseCase } from '../../application/use-cases/get-app-hello.use-case';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [GetAppHelloUseCase],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
