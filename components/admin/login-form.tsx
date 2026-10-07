'use client';
import { useActionState } from 'react';
import { login, type AdminState } from '@/app/admin/actions';

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {} as AdminState);
  return (
    <form action={action} className="space-y-4">
      {state.error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800">{state.error}</p>}
      <div><label htmlFor="email" className="label">Email</label><input id="email" name="email" type="email" required autoComplete="username" className="field" /></div>
      <div><label htmlFor="password" className="label">Password</label><input id="password" name="password" type="password" required minLength={8} autoComplete="current-password" className="field" /></div>
      <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">{pending ? 'Masuk...' : 'Masuk'}</button>
    </form>
  );
}
