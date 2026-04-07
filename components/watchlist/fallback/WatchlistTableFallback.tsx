import DataTable from '@/components/all/DataTable';

export default function WatchlistTableFallback() {
  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: 'Token',
      cell: () => (
        <div className="token-info flex gap-2 items-center">
          <div className="w-7 h-7 rounded-full skeleton" />
          <div className="skeleton h-4 w-24" />
        </div>
      ),
    },
    {
      header: 'Price',
      cell: () => <div className="skeleton h-4 w-20" />,
    },
    {
      header: '24h Change',
      cell: () => (
        <div className="flex items-center gap-2">
          <div className="skeleton h-4 w-14" />
        </div>
      ),
    },
    {
      header: 'Market Cap',
      cell: () => <div className="skeleton h-4 w-24" />,
    },
    {
      header: 'Watchlist',
      cell: () => <div className="skeleton h-9 w-20 rounded-md" />,
    },
  ];

  const rows: CoinMarketData[] = Array.from({ length: 6 });

  return (
    <div className="rounded-2xl border overflow-hidden custom-scrollbar bg-(--bg-surface) border-(--border-standard)">
      <DataTable<CoinMarketData>
        data={rows}
        columns={columns}
        rowKey={(_, index) => `watchlist-skeleton-${index}`}
        tableClassName="watchlist-table"
        headerClassName="py-3!"
        bodyCellClassName="py-2! px-4"
      />
    </div>
  );
};
