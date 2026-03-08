'use client';

import { useState, useMemo } from 'react';

import { formatCurrency, timeAgo } from '@/lib/utils';

import DataTable from '@/components/all/DataTable';

const exchangeListingsColumns: DataTableColumn<Ticker>[] = [
  {
    header: 'Exchange',
    cell: (row) => <span className="text-(--color-primary-hover) font-medium">{row.market.name}</span>,
  },
  {
    header: 'Pair',
    cell: (row) => (
      <span className="font-medium">
        {row.base} / {row.target}
      </span>
    ),
  },
  {
    header: 'Price',
    cell: (row) => <span className="font-medium">{formatCurrency(row.converted_last.usd)}</span>,
  },
  {
    header: 'Last Traded',
    cell: (row) => timeAgo(row.timestamp),
  },
];

const ITEMS_PER_PAGE = 5;

export default function ExchangeListings({ tickers }: { tickers: Ticker[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tickers.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return tickers.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, tickers]);

  return (
    <div className="lg:col-span-2 custom-scrollbar">
      <h4 className="text-xl md:text-2xl font-semibold mb-2 text-(--color-100)">
        Exchange Listings
      </h4>

      <DataTable
        data={paginatedData}
        columns={exchangeListingsColumns}
        rowKey={(row) =>
          `${row.market.name}-${row.base}-${row.target}-${row.converted_last.usd}`
        }
        tableClassName="coins-table"
        headerClassName="py-3!"
        bodyCellClassName="min-w-[175px] py-7!"
      />

      <div className="flex justify-center items-center md:justify-end gap-3 mt-4 text-sm text-(--color-70)">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-3 py-1 bg-(--bg-elevated) border border-(--color-10) text-(--color-70) rounded-lg hover:bg-(--color-10) ${
            currentPage === 1
              ? "hover:cursor-not-allowed"
              : "hover:cursor-pointer"
          } transition disabled:opacity-40`}
        >
          Prev
        </button>

        <span>
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-3 py-1 bg-(--bg-elevated) border border-(--color-10) text-(--color-70) rounded-lg hover:bg-(--color-10) ${
            currentPage === totalPages
              ? "hover:cursor-not-allowed"
              : "hover:cursor-pointer"
          } transition disabled:opacity-40`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
