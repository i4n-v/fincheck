import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthenticateUseCase } from './application/use-cases/authenticate.use-case';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<JwtSignOptions['secret']>('jwt.secret')!,
        signOptions: {
          expiresIn:
            configService.get<JwtSignOptions['expiresIn']>('jwt.expiresIn')!,
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthenticateUseCase],
})
export class AuthModule {}
