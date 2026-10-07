import { LoginForm } from '@/components/admin/login-form';

export const metadata = { title: 'Masuk Admin', robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-light px-5">
      <div className="card w-full max-w-sm">
        <h1 className="text-2xl font-extrabold">Admin TSUKURE.ID</h1>
        <div className="mt-6"><LoginForm /></div>
      </div>
    </main>
  );
}
