import { prisma } from '@/lib/prisma';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { EnquiryManager } from '@/components/admin/EnquiryManager';

export const revalidate = 0; // Disable server component cache to load fresh lead data

interface EnquiriesPageProps {
  searchParams?: Promise<{ page?: string; status?: string; search?: string }>;
}

export default async function AdminEnquiries({ searchParams }: EnquiriesPageProps) {
  const params = await searchParams;
  const page = parseInt(params?.page || '1', 10);
  const status = params?.status || 'ALL';
  const search = params?.search || '';
  const limit = 10;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (status !== 'ALL') {
    if (status === 'CLOSED') {
      where.status = { in: ['WON', 'LOST', 'CLOSED'] };
    } else {
      where.status = status;
    }
  }
  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { mobile: { contains: search } },
    ];
  }

  const [enquiries, totalCount] = await Promise.all([
    prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.enquiry.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <EnquiryManager
          initialEnquiries={enquiries}
        />
      </main>
    </div>
  );
}
