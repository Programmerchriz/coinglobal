import { getCategories } from '@/lib/api/categories';
import CategoriesTable from '@/components/categories/CategoriesTable';
import CoinsPagination from '@/components/all/CoinsPagination';
import BackButton from '@/components/ui/BackButton';

export default async function CategoriesPage({ searchParams }: NextPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const perPage: number = 10;

  const categories = await getCategories();

  const totalPages = Math.ceil(categories.length / perPage);

  const paginatedCategories = categories.slice((currentPage - 1) * perPage, currentPage * perPage);

  const hasMorePages = currentPage < totalPages;

  return (
    <div className="min-h-screen bg-(--bg-app) text-(--text-primary) px-4 md:px-8 py-8">
      <div className="absolute -top-50 w-100 h-100 bg-(--color-primary)/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 w-100 h-100 bg-(--color-accent)/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        <div>
          <BackButton />
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">All Categories</h1>
          <p className="text-(--color-50) text-sm mt-1">
            Explore crypto market categories and sector performance.
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl shadow-xl animate-fade-in-up transition-all duration-500 hover:shadow-2xl">
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
}
