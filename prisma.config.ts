import 'dotenv/config';
import { defineConfig } from '@prisma/config';

const url = process.env.DATABASE_URL ?? 'postgresql://placeholder:placeholder@localhost:5432/placeholder';

export default defineConfig({
  datasources: {
    db: {
      // Prisma 7+ expects datasource URLs outside schema.prisma; CLI flags can override this.
      url,
    },
  },
});
