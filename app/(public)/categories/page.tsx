
import { redirect } from "next/navigation";
import { getServerSession } from '@/lib/session';

import { getCategories } from '@/lib/api/categories';
import CategoriesTable from '@/components/categories/CategoriesTable';
import CoinsPagination from '@/components/all/CoinsPagination';
import BackButton from '@/components/ui/BackButton';

export default async function CategoriesPage({ searchParams }: NextPageProps) {
  const session = await getServerSession();

  if (!session) redirect("/sign-in");

  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const perPage: number = 10;

  const categories = await getCategories();

  const totalPages = Math.ceil(categories.length / perPage);

  const paginatedCategories = categories.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const hasMorePages = currentPage < totalPages;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 md:px-8 py-8">
      
    {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        <div>
          <BackButton />
        </div>
        
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            All Categories
          </h1>
          <p className="text-white/50 text-sm mt-1">
            Explore crypto market categories and sector performance.
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-[#111827] border border-white/5 rounded-2xl shadow-xl animate-fade-in-up transition-all duration-500 hover:shadow-2xl">
          <div id="categories" className="custom-scrollbar p:4 md:p-6">
            <CategoriesTable categories={paginatedCategories} />
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <CoinsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasMorePages={hasMorePages}
            basePath="categories"
          />
        </div>
      </div>
    </div>
  );
};
