import { UseQueryOptions } from '@tanstack/react-query';
import { FieldType, PageOptions, SelectOption, TableProps } from './types';
import { CellContext, Column, HeaderContext, RowData } from '@tanstack/react-table';

export * from './types';
export * from './lib';
export * from './components';
declare module '@tanstack/table-core' {
    interface ColumnMeta<TData extends RowData, TValue> {
        visible?: boolean;
        editable?: boolean;
        exportable?: boolean;
        filterable?: boolean;
        type?: FieldType;
        useQueryOptions?: UseQueryOptions<Array<SelectOption>>;
        tableProps?: (cell?: CellContext<TData, unknown>) => TableProps<any>;
        customFilter?: React.FC<{
            header: HeaderContext<TData, unknown>;
            value: any;
            setValue: (value: any) => void;
        }>;
        customForm?: React.FC<{
            column: Column<any, unknown>;
            value: any;
            setValue: (value: any) => void;
        }>;
        multiSelectUnique?: boolean;
        toggleShow?: boolean;
        getCellStyle?: (cell: CellContext<TData, TValue>) => React.CSSProperties;
        getCellClass?: (cell: CellContext<TData, TValue>) => string;
    }
}
declare module '@tanstack/query-core' {
    interface QueryMeta extends Partial<PageOptions> {
    }
}
