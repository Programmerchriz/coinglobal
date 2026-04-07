import DataTable from '@/components/all/DataTable';

type Props = {
  watchlist: CoinMarketData[];
  columns: DataTableColumn<CoinMarketData>[];
};

export default function WatchlistTable({ watchlist, columns }: Props) {
  return (
    <DataTable
      data={watchlist}
      columns={columns}
      rowKey={(row) => row.id}
      tableClassName="watchlist-table"
      headerClassName="py-3!"
      bodyCellClassName="py-2! px-4"
    />
  );
}
