import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import path from 'node:path';

// Mengarahkan dotenv secara paksa ke file .env di folder utama project
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  dialect: 'mysql',
  schema: './lib/db-schema.ts',
  out: './drizzle',
  dbCredentials: { 
    url: process.env.DATABASE_URL as string 
  },
});