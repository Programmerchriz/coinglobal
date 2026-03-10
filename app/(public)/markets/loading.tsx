
import DataTable from '@/components/all/DataTable';

type MarketCoin = {
  id?: string;
};

export default function Loading() {
  const columns = [
    {
      header: '#',
      cell: () => <div className="skeleton w-6 h-4" />,
    },
    {
      header: 'Name',
      cell: () => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full skeleton" />
          <div className="flex flex-col gap-2">
            <div className="skeleton w-20 h-3" />
            <div className="skeleton w-12 h-3" />
          </div>
        </div>
      ),
    },
    {
      header: 'Price',
      cell: () => <div className="skeleton w-20 h-4" />,
    },
    {
      header: '24h Change',
      cell: () => (
        <div className="flex items-center gap-2">
          <div className="skeleton w-3 h-3 rounded-full" />
          <div className="skeleton w-16 h-4" />
        </div>
      ),
    },
    {
      header: 'Market Cap',
      cell: () => <div className="skeleton w-24 h-4" />,
    },
    {
      header: 'Volume (24h)',
      cell: () => <div className="skeleton w-24 h-4" />,
    },
    {
      header: 'Chart',
      cell: () => <div className="skeleton w-24 h-10 rounded-md" />,
    },
  ];

  const rows: MarketCoin[] = Array.from({ length: 10 });

  return (
    <section
      id="markets-fallback"
      className="bg-(--bg-surface) border border-(--color-5) rounded-2xl shadow-xl p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="skeleton w-32 h-6" />
        <div className="skeleton w-40 h-9 rounded-lg" />
      </div>

      {/* Table */}
      <DataTable<MarketCoin>
        columns={columns}
        data={rows}
        rowKey={(_, index) => `skeleton-${index}`}
        tableClassName="w-full"
      />
    </section>
  );
};
