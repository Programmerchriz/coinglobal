import DataTable from '@/components/all/DataTable';

export const AllCoinsFallback = () => {
  const columns = [
    {
      header: 'Rank',
      cell: () => <div className="rank-skeleton skeleton" />,
    },
    {
      header: 'Token',
      cell: () => (
        <div className="token-info">
          <div className="token-image skeleton" />
          <div className="token-line skeleton" />
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
        <div className="change-cell">
          <div className="change-line skeleton" />
        </div>
      ),
    },
    {
      header: 'Market Cap',
      cell: () => <div className="market-cap-line skeleton" />,
    },
  ];

  const rows: CoinMarketData[] = Array.from({ length: 10 });

  return (
    <section id="all-coins-fallback">
      <h4>All Coins</h4>

      <DataTable<CoinMarketData>
        columns={columns}
        data={rows}
        rowKey={(_, index) => `skeleton-${index}`}
        tableClassName="coins-table"
        headerClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </section>
  );
};
