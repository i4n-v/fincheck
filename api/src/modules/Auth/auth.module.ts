import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './presentation/controllers/auth.controller';
import { SigninUseCase } from './application/use-cases/signin.use-case';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { SignupUseCase } from './application/use-cases/signup.use-case';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
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
  providers: [SigninUseCase, SignupUseCase],
})
export class AuthModule {}
