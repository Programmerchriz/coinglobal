import DataTable from '@/components/all/DataTable';

export default function CoinsTableFallback() {
  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: 'Rank',
      cell: () => <div className="skeleton h-4 w-10" />,
    },
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

  const rows: CoinMarketData[] = Array.from({ length: 10 });

  return (
    <div className="space-y-6">
      <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl shadow-xl overflow-hidden">
        <div id="coins-page-fallback" className="custom-scrollbar py-4 md:py-2">
          <DataTable<CoinMarketData>
            columns={columns}
            data={rows}
            rowKey={(_, index) => `coins-skeleton-${index}`}
            tableClassName="coins-table"
            headerClassName="py-3!"
            bodyCellClassName="py-2! px-4"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="skeleton h-10 w-64 rounded-xl" />
      </div>
    </div>
  );
}
