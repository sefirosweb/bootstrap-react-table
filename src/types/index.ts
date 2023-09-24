import { FilterLabel } from "@sefirosweb/react-multiple-search"
import { UseQueryOptions } from "@tanstack/react-query"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import React from "react"
export type ActionCrud = 'create' | 'edit' | 'delete'
export type FieldType = 'text' | 'number' | 'date' | 'datetime' | 'select' | 'checkbox'

export type FormDataType = Record<string | number | symbol, any>

export type Filter = Record<string, any>

export type MutationVars = {
    formData: FormDataType;
    action: ActionCrud;
};

export type PageOptions = {
    page: number,
    pageSize: number
    filters: Array<Filter>,
    orders: Array<Record<string, 'asc' | 'desc'>>,
}

export type SelectOption = {
    value: string;
    label: string;
    [key: string]: unknown;
}

export type QueryEagle<T> = {
    results: Array<T>
}

type Lazy<T> = {
    lazy: true,
    useQueryOptions: UseQueryOptions<QueryPage<T>>
}

type Eagle<T> = {
    lazy: false,
    useQueryOptions: UseQueryOptions<QueryEagle<T>>
}

export type TableProps<T> = {
    columns: Array<ColumnDef<T>>,
    crudOptions: CrudOptions<T>,
    lazy: boolean,
} & (
        | Lazy<T>
        | Eagle<T>
    )


export type QueryPage<T> = {
    pages: number,
    results: Array<T>
    totalRows: number,
    currentPage: number,
    nextCursor: number | null,
    prevCursor: number | null,
}

type CellButtons<T> = React.FC<{
    cell: CellContext<T, unknown>
    onClick: () => void
}>

type CreateButton = React.FC<{
    onClick: () => void
}>

export type CrudOptions<T> = {
    id?: string,
    primaryKey: keyof T,

    create?: boolean,
    createFn?: (action: () => void) => void,
    createButton?: CreateButton,

    edit?: boolean,
    editFn?: (action: () => void, cell: CellContext<T, unknown>) => void,
    editButton?: CellButtons<T>,

    delete?: boolean,
    deleteFn?: (action: () => void, cell: CellContext<T, unknown>) => void,
    deleteButton?: CellButtons<T>,
    onDeleteModal?: (cell: CellContext<T, unknown>) => JSX.Element,

    canRefresh?: boolean,
    onSubmitFn?: (data: Partial<T>, action: ActionCrud) => Promise<Partial<T> | null>,

    canExport?: boolean,

    globalSearch?: boolean,
    enableGlobalFilterLabels?: Array<FilterLabel>
    delayFilter?: number,

    pageSize?: number,
    pageSizes?: Array<number>,
    customButtons?: JSX.Element
}
