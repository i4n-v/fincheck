import { plainToInstance, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  NotEquals,
  ValidateNested,
  validateSync,
} from 'class-validator';

class JwtEnv {
  @IsNotEmpty()
  @IsString()
  @NotEquals('unsecure_jwt_secret')
  secret: string;

  @IsNotEmpty()
  @IsString()
  expiresIn: string;
}

class DatabaseEnv {
  @IsNotEmpty()
  @IsString()
  url: string;
}
class Env {
  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => JwtEnv)
  jwt: JwtEnv;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DatabaseEnv)
  database: DatabaseEnv;
}

export default function configuration() {
  const env = plainToInstance(Env, {
    port: parseInt(process.env.APP_PORT!),
    jwt: {
      secret: process.env.JWT_SECRET!,
      expiresIn: process.env.JWT_EXPIRES_IN!,
    },
    database: {
      url: process.env.DATABASE_URL!,
    },
  });

  const errors = validateSync(env);

  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors, null, 2));
  }

  return env;
}
