import TableHeader from "./header";
import TableRows from "./rows";
import { TableProps } from "./types";

const style = {
  borderCollapse: 'collapse',
  flex: '1',
} as const;

export default function Table<T>({ data, columns }: TableProps<T>){
  return (
    <table style={style}>
      <TableHeader columns={columns} />
      <TableRows
        data={data}
        columns={columns}
      />
    </table>
  );
};
