import { config as loadEnv } from 'dotenv';
import path from 'node:path';
import type { PrismaConfig } from 'prisma';

const nodeEnv = process.env.NODE_ENV || 'development';

loadEnv({ path: path.resolve(__dirname, `.env.${nodeEnv}`) });

export default {
  schema: path.join('src', 'configs', 'database', 'prisma'),
} satisfies PrismaConfig;
