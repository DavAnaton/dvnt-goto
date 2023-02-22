import { TableRowsProps } from "./types";

const style = {
  border: '1px solid black'
}

export default function TableRows<T>({ data, columns }: TableRowsProps<T>){
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`}>
        {columns.map((column, index2) => {
          return (
            <td key={`cell-${index2}`} style={style}>
              {
                column.render ? 
                  column.render(row):
                  row[column.key] as any
              }
            </td>
          );
        }
        )}
      </tr>
    );
  });

  return (
    <tbody>
      {rows}
    </tbody>
  );
};
