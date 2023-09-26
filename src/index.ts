import { RowData } from "@tanstack/react-table";
import { FieldType, PageOptions, SelectOption } from "./types";
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
        filterable?: boolean;
        type?: FieldType;
        useQueryOptions?: UseQueryOptions<Array<SelectOption>>,
        addNullOption?: boolean;
    }
}

declare module '@tanstack/query-core' {
    interface QueryMeta extends Partial<PageOptions> { }
}