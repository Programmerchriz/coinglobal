
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const DataTable = <T,>({
  columns,
  data,
  rowKey,
  tableClassName,
  headerClassName,
  headerRowClassName,
  headerCellClassName,
  bodyRowClassName,
  bodyCellClassName,
}: DataTableProps<T>) => {
  return (
    <Table className={cn('w-full', tableClassName)}>
      <TableHeader className={headerClassName}>
        <TableRow
          className={cn('border-b border-(--color-5)', headerRowClassName)}
        >
          {columns.map((column, i) => (
            <TableHead
              key={i}
              className={cn(
                'text-(--color-50) text-xs uppercase tracking-wide py-4 first:pl-4 last:pr-4',
                headerCellClassName
              )}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowKey(row, rowIndex)}
            className={cn(
              'border-b border-(--color-5) hover:bg-(--color-5) transition-colors',
              bodyRowClassName
            )}
          >
            {columns.map((column, columnIndex) => (
              <TableCell
                key={columnIndex}
                className={cn(
                  'py-4 text-sm text-(--color-90) first:pl-4 last:pr-4',
                  bodyCellClassName,
                  column.cellClassName
                )}
              >
                {column.cell(row, rowIndex)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
