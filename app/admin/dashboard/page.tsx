import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { AdminDashboardContent } from '@/components/admin/AdminDashboardContent';

export const metadata = {
  title: 'Admin Dashboard | Valtrix',
  description: 'Valtrix Materials Content Management System',
};

export default async function AdminDashboardPage() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB] pt-4">
      <AdminDashboardContent username={session.username || 'Admin'} />
    </div>
  );
}
