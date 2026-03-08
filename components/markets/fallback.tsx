import DataTable from '@/components/all/DataTable';

export const CoinOverviewFallback = () => {
  return (
    <section id="coin-overview-fallback" className="border rounded-2xl shadow-xl p-4">
      {/* Header */}
      <div className="header">
        <div className="header-image skeleton" />
        <div className="info">
          <div className="header-line-sm skeleton" />
          <div className="header-line-lg skeleton" />
        </div>
      </div>

      {/* Period buttons */}
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="period-button-skeleton skeleton" />
        ))}
      </div>

      {/* Chart */}
      <div className="chart">
        <div className="chart-skeleton skeleton" />
      </div>
    </section>
  );
};

export const TrendingCoinsFallback = () => {
  const columns = [
    {
      header: 'Name',
      cell: () => (
        <div className="name-cell">
          <div className="name-link">
            <div className="name-image skeleton" />
            <div className="name-line skeleton" />
          </div>
        </div>
      ),
    },
    {
      header: 'Price',
      cell: () => <div className="price-line skeleton" />,
    },
    {
      header: '24h Change',
      cell: () => (
        <div className="price-change">
          <div className="change-icon skeleton" />
          <div className="change-line skeleton" />
        </div>
      ),
    },
  ];

  const rows: TrendingCoin[] = Array.from({ length: 6 });

  return (
    <section id="trending-coins-fallback" className="bg-(--bg-surface) border border-(--color-5) rounded-2xl shadow-xl p-4">
      <h4>Trending Coins</h4>

      <div className="trending-coins-table">
        <DataTable<TrendingCoin>
          columns={columns}
          data={rows}
          rowKey={(_, index) => `skeleton-${index}`}
          tableClassName="w-full"
        />
      </div>
    </section>
  );
};

export const CategoriesFallback = () => {
  const columns = [
    {
      header: 'Category',
      cell: () => (
        <div className="name-cell">
          <div className="name-line skeleton w-32" />
        </div>
      ),
    },
    {
      header: 'Top Gainers',
      cell: () => (
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full skeleton" />
          ))}
        </div>
      ),
    },
    {
      header: '24h Change',
      cell: () => (
        <div className="price-change ml-4">
          <div className="change-icon skeleton" />
          <div className="change-line skeleton w-16" />
        </div>
      ),
    },
    {
      header: 'Market Cap',
      cell: () => <div className="price-line skeleton w-24" />,
    },
    {
      header: 'Volume 24h',
      cell: () => <div className="price-line skeleton w-24" />,
    },
  ];

  const rows: Category[] = Array.from({ length: 6 });

  return (
    <section id="categories-fallback" className="bg-(--bg-surface) border border-(--color-5) rounded-2xl shadow-xl p-4">
      <h4>Top Categories</h4>

      <DataTable<Category>
        columns={columns}
        data={rows}
        rowKey={(_, index) => `skeleton-${index}`}
        tableClassName="top-categories-table"
        headerClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </section>
  );
};
