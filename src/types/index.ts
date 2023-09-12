import { CellContext } from "@tanstack/react-table"
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
}

export type SelectOption = {
    value: string;
    label: string;
    [key: string]: unknown;
}

export type QueryPage<T> = {
    pages: number,
    results: Array<T>
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
    editFn?: (action: () => void) => void,
    editButton?: CellButtons<T>,

    delete?: boolean,
    deleteFn?: (action: () => void) => void,
    deleteButton?: CellButtons<T>,
    onDeleteModal?: (cell: CellContext<T, unknown>) => JSX.Element,

    canRefresh?: boolean,
    onSubmitFn?: (data: Partial<T>, action: ActionCrud) => Promise<Partial<T> | null>,

    globalSearch?: boolean,
    pageSize?: number,
    pageSizes?: Array<number>,
    customButtons?: JSX.Element
}
