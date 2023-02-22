import { TableHeaderProps } from "./types";

export default function TableHeader<T>({ columns }: TableHeaderProps<T>){
  const headers = columns.map((column, index) => {
    const style = {
      borderBottom: '2px solid black'
    };

    return (
      <th
        key={`headCell-${index}`}
        style={style}
      >
        {column.header}
      </th>
    );
  });

  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  );
};
