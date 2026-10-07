import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

/** Penyimpanan file privat di disk server, di luar public/. Hanya diakses lewat route yang terotorisasi. */
export interface StorageService {
  save(folder: string, data: Buffer, ext: string): Promise<string>;
  read(key: string): Promise<Buffer>;
}

function root(): string {
  return path.resolve(process.env.STORAGE_DIR || path.join(process.cwd(), 'storage'));
}

function safePath(key: string): string {
  const full = path.resolve(root(), key);
  if (!full.startsWith(root() + path.sep)) throw new Error('Invalid storage key');
  return full;
}

export const storage: StorageService = {
  async save(folder, data, ext) {
    const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '');
    const key = `${safeFolder}/${randomUUID()}.${ext.replace(/[^a-z0-9]/gi, '')}`;
    const full = safePath(key);
    await fs.mkdir(path.dirname(full), { recursive: true });
    await fs.writeFile(full, data, { mode: 0o600 });
    return key;
  },
  async read(key) {
    return fs.readFile(safePath(key));
  },
};
