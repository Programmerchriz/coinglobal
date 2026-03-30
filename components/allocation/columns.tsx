
type Asset = {
  name: string;
  symbol: string;
  value: string;
  allocation: string;
};

export const columns: DataTableColumn<Asset>[] = [
  {
    header: "Asset",
    cell: (row) => (
      <span className="text-(--text-primary) font-medium">
        {row.name}
      </span>
    ),
  },
  {
    header: "Symbol",
    cell: (row) => (
      <span className="text-(--color-60)">
        {row.symbol}
      </span>
    ),
  },
  {
    header: "Value",
    cell: (row) => (
      <span className="text-(--text-primary)">
        {row.value}
      </span>
    ),
  },
  {
    header: "Allocation",
    cell: (row) => (
      <span className="text-(--color-success) text-right block">
        {row.allocation}
      </span>
    ),
    cellClassName: "text-right",
  },
];
