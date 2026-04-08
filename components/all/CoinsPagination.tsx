'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { buildPageNumbers, cn, ELLIPSIS } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const CoinsPagination = ({
  currentPage,
  totalPages,
  hasMorePages,
  basePath,
  onPageChange,
}: Pagination) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
      return;
    }

    const normalizedBasePath = basePath.startsWith('/')
      ? basePath
      : `/${basePath}`;

    router.push(`${normalizedBasePath}?page=${page}`);
  };

  const pageNumbers = buildPageNumbers(currentPage, totalPages);
  const isLastPage = !hasMorePages || currentPage === totalPages;

  return (
    <Pagination className="mt-6">
      <PaginationContent className="flex items-center gap-2">
        
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              'bg-(--bg-surface) border border-(--color-10) text-primary hover:bg-(--color-5) rounded-lg px-3 py-2 transition',
              currentPage === 1 && 'opacity-40 pointer-events-none'
            )}
            onClick={() =>
              currentPage > 1 && handlePageChange(currentPage - 1)
            }
          />
        </PaginationItem>

        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === ELLIPSIS ? (
              <PaginationEllipsis className="text-(color-40)" />
            ) : (
              <PaginationLink
                className={cn(
                  'px-4 py-2 rounded-lg text-sm transition border',
                  currentPage === page
                    ? 'bg-(--color-primary) border-(--color-primary) text-white'
                    : 'bg-(--bg-surface) border-(--color-5) text-(--color-70) hover:bg-(--color-5)'
                )}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className={cn(
              'bg-(--bg-surface) border border-(--color-10) text-primary hover:(--color-5) rounded-lg px-3 py-2 transition',
              currentPage === totalPages && 'opacity-40 pointer-events-none'
            )}
            onClick={() =>
              !isLastPage && handlePageChange(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CoinsPagination;
