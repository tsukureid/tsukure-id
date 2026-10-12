import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { getDb, isDbConfigured } = vi.hoisted(() => ({
  getDb: vi.fn(),
  isDbConfigured: vi.fn(),
}));

vi.mock('server-only', () => ({}));
vi.mock('@/lib/db', () => ({
  getDb,
  isDbConfigured,
  schema: { portfolios: { isPublished: 'isPublished', createdAt: 'createdAt' } },
}));
vi.mock('drizzle-orm', () => ({
  and: vi.fn(),
  asc: vi.fn(),
  desc: vi.fn((value) => value),
  eq: vi.fn((column, value) => ({ column, value })),
}));

import { getPortfolio } from '@/lib/data';

describe('getPortfolio for /cv', () => {
  const query = {
    orderBy: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    query.orderBy.mockReset();
    getDb.mockReturnValue({
      select: () => ({
        from: () => ({
          where: () => query,
        }),
      }),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('warns when the database is not configured', async () => {
    isDbConfigured.mockReturnValue(false);

    await expect(getPortfolio({ logForCv: true })).resolves.toEqual([]);

    expect(console.warn).toHaveBeenCalledWith('[cv] portfolio: DATABASE_URL belum dikonfigurasi');
    expect(getDb).not.toHaveBeenCalled();
  });

  it('logs a query error with portfolio context', async () => {
    isDbConfigured.mockReturnValue(true);
    query.orderBy.mockRejectedValue(new Error('database unavailable'));

    await expect(getPortfolio({ logForCv: true })).resolves.toEqual([]);

    expect(console.error).toHaveBeenCalledWith('[cv] portfolio: query failed', 'database unavailable');
  });

  it('logs when the published portfolio query succeeds but returns no items', async () => {
    isDbConfigured.mockReturnValue(true);
    query.orderBy.mockResolvedValue([]);

    await expect(getPortfolio({ logForCv: true })).resolves.toEqual([]);

    expect(console.info).toHaveBeenCalledWith('[cv] portfolio: tidak ada item dipublikasikan');
  });
});
