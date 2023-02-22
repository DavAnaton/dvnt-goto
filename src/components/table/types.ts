
export type TableHeaderProps<T> = {
  columns: Array<ColumnDefinitionType<T>>;
}

export type TableRowsProps<T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T>>;
}

export type ColumnDefinitionType<T> = {
    key: keyof T;
    header: string;
    width?: number;
    render?: (item: T) => any;
}

export type TableProps<T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T>>;
}
