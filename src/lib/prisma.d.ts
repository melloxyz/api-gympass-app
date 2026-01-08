import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { env } from '../env/index.js';

const { Pool } = pg;
const pool = new Pool({ connectionString: env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query'] : [],
    adapter,
});