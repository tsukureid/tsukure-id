import 'server-only';
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './db-schema';

type Db = MySql2Database<typeof schema>;
const g = globalThis as unknown as { __tsukureDb?: Db };

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/** Koneksi tunggal per proses (aman untuk hosting dengan batas koneksi kecil). */
export function getDb(): Db {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL belum diisi');
  if (!g.__tsukureDb) {
    const pool = mysql.createPool({ uri: process.env.DATABASE_URL, connectionLimit: 5, waitForConnections: true });
    g.__tsukureDb = drizzle(pool, { schema, mode: 'default' });
  }
  return g.__tsukureDb;
}

export { schema };
