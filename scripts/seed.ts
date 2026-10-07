/* Seed awal: layanan, FAQ, dan akun admin (dari ADMIN_EMAIL / ADMIN_PASSWORD). Aman dijalankan ulang. */
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { count, eq } from 'drizzle-orm';
import * as schema from '../lib/db-schema';
import { SERVICE_SEEDS } from '../content/services';
import { FAQ_SEEDS } from '../content/faq';

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL belum diisi');
  const pool = mysql.createPool({ uri: url, connectionLimit: 2 });
  const db = drizzle(pool, { schema, mode: 'default' });

  const [{ n: serviceCount } = { n: 0 }] = await db.select({ n: count() }).from(schema.services);
  if (serviceCount === 0) {
    for (const s of SERVICE_SEEDS) await db.insert(schema.services).values({ id: crypto.randomUUID(), ...s, startingPrice: null });
    console.log(`Layanan: ${SERVICE_SEEDS.length} ditambahkan (harga belum diisi, atur lewat admin)`);
  }
  const [{ n: faqCount } = { n: 0 }] = await db.select({ n: count() }).from(schema.faqs);
  if (faqCount === 0) {
    for (const [i, f] of FAQ_SEEDS.entries()) await db.insert(schema.faqs).values({ id: crypto.randomUUID(), ...f, sortOrder: i });
    console.log(`FAQ: ${FAQ_SEEDS.length} ditambahkan`);
  }
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    if (password.length < 12) throw new Error('ADMIN_PASSWORD minimal 12 karakter');
    const existing = await db.select().from(schema.admins).where(eq(schema.admins.email, email)).limit(1);
    if (existing.length === 0) {
      await db.insert(schema.admins).values({ id: crypto.randomUUID(), email, name: 'Admin', passwordHash: await bcrypt.hash(password, 12) });
      console.log(`Admin dibuat: ${email}`);
    }
  } else {
    console.log('ADMIN_EMAIL/ADMIN_PASSWORD tidak diisi: akun admin tidak dibuat');
  }
  await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
