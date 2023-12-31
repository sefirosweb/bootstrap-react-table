import { FilterLabel, Filters } from "@sefirosweb/react-multiple-search"
import { QueryKey, UseQueryOptions } from "@tanstack/react-query"
import { CellContext, ColumnDef, ColumnFiltersState, Row, Table, TableOptions } from "@tanstack/react-table"
import React from "react"
export type ActionCrud = 'create' | 'edit' | 'delete'
export type FieldType = 'text' | 'number' | 'date' | 'datetime' | 'select' | 'checkbox' | 'multiselect'

export type FormDataType = Record<string | number | symbol, any>

export type Filter = Record<string, any>

export type MutationVars = {
    formData: FormDataType;
    action: ActionCrud;
};

export type PageOptions = {
    page: number,
    pageSize: number
    globalFilter?: string,
    inputFilters?: Array<Filters>,
    columnFilters?: ColumnFiltersState,
    sorting: Array<{
        id: string,
        desc: boolean
    }>,
}

export type SelectOption = {
    value: string;
    label: string;
    [key: string]: unknown;
}

export type CustomTableOptions<T> = Omit<TableOptions<T>, 'columns' | 'data' | 'getCoreRowModel'>

export type TableProps<T> = {
    columns: Array<ColumnDef<T>>,
    crudOptions: CrudOptions<T>,
    customTableOptions?: CustomTableOptions<T>,
    lazy: boolean,
} & (
        | Lazy<T>
        | Eagle<T>
    )

type Lazy<T> = {
    lazy: true,
    useQueryOptions: UseQueryOptions<QueryPage<T>>
}

type Eagle<T> = {
    lazy: false,
    useQueryOptions: UseQueryOptions<QueryEagle<T>>
}

export type QueryEagle<T> = {
    results: Array<T>
}

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
    queryKeyOnRefresh?: QueryKey,
    onSubmitFn?: (data: Partial<T>, action: ActionCrud) => Promise<Partial<T> | null>,

    exportFilteredData?: boolean
    exportName?: string
    exportFn?: (data: {
        tableData: Array<T>,
        table: Table<T>,
        pageOptions?: PageOptions
    }) => void,

    canExport?: boolean,

    globalSearch?: boolean,
    enableGlobalFilterLabels?: Array<FilterLabel>
    delayFilter?: number,

    pageOptions?: PageOptions,
    setPageOptions?: React.Dispatch<React.SetStateAction<PageOptions>>,

    pageSizes?: Array<number>,
    customButtons?: JSX.Element

    toggleShowColumns?: boolean,
    canSelectRow?: boolean;

    pagination?: boolean

    getRowStyles?: (row: Row<T>) => React.CSSProperties;
    getRowClass?: (row: Row<T>) => string;
}

export interface TableContext {
    columns: Array<ColumnDef<any>>,
    crudOptions: CrudOptions<any>,
    customTableOptions?: CustomTableOptions<any>,
    tableData: Array<any>,
    isFetching: boolean,

    isLazy: boolean,
    pageSizes: Array<number>,
    pageOptions: PageOptions,
    setPageOptions: React.Dispatch<React.SetStateAction<PageOptions>>,
    pages?: number,
    totalRows?: number,
    refreshTable: () => void,
    queryKey: QueryKey
}