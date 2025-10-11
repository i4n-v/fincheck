import { Module } from '@nestjs/common';
import { AppController } from './presentation/controllers/app.controller';
import { GetAppHelloUseCase } from './application/use-cases/get-app-hello.use-case';
import { DatabaseModule } from 'src/configs/database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/configs/configuration';
import { UserModule } from '../user/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.test', '.env.production'],
      load: [configuration],
    }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    UserModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [GetAppHelloUseCase],
})
export class AppModule {}
