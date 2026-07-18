import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { StandaloneLoginForm } from '@/components/admin/StandaloneLoginForm';

export const metadata = {
  title: 'Admin Login | Valtrix',
  description: 'Valtrix Materials Admin Authentication Portal',
};

export default async function AdminLoginPage() {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect('/admin/dashboard');
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-12">
      <div className="max-w-md w-full">
        <StandaloneLoginForm />
      </div>
    </div>
  );
}
