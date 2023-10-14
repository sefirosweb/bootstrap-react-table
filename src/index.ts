import { CellContext, Column, HeaderContext, RowData, StringOrTemplateHeader } from "@tanstack/react-table";
import { FieldType, PageOptions, SelectOption, TableProps } from "./types";
import { UseQueryOptions } from "@tanstack/react-query";

export * from "./types"
export { i18nInstance, matchString, useGetQueryClient } from './lib'

export { FormSelect } from './components/FormSelect'
export { Modal } from './components/Modal'
export { Table } from './components/Table'
export type { TableRef } from './components/Table'
export { DeleteButton } from './components/buttons/DeleteButton'
export { EditButton } from './components/buttons/EditButton'
export { LoadingButton } from './components/buttons/LoadingButton'

declare module '@tanstack/table-core' {
    interface ColumnMeta<TData extends RowData, TValue> {
        visible?: boolean;
        editable?: boolean;
        exportable?: boolean;
        filterable?: boolean;
        type?: FieldType;
        useQueryOptions?: UseQueryOptions<Array<SelectOption>>,
        tableProps?: (cell?: CellContext<TData, unknown>) => TableProps<any>,
        customFilter?: React.FC<{ header: HeaderContext<TData, unknown>, value: any, setValue: (value: any) => void }>,
        customForm?: React.FC<{ column: Column<any, unknown>, value: any, setValue: (value: any) => void }>,
        multiSelectUnique?: boolean;
        addNullOption?: boolean;
        toggleShow?: boolean
        getCellStyle?: (cell: CellContext<TData, TValue>) => React.CSSProperties;
        getCellClass?: (cell: CellContext<TData, TValue>) => string;
    }
}

declare module '@tanstack/query-core' {
    interface QueryMeta extends Partial<PageOptions> { }
}