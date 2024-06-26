import { forwardRef } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { useGetQueryClient } from "../../lib/useGetQueryClient"
import { PageOptions, TableProps } from "@/types"
import { TableEagle } from "./TableEagle"
import { TableLazy } from "./TableLazy"
import { type Table as ReactTable } from "@tanstack/react-table";

export type Props = {
    tableProps: TableProps<any>
}

export type TableRef = {
    refreshTable: () => void
    setShowModal: (show: boolean) => void
    setIsLoadingModal: (isLoading: boolean) => void
    getSelectedRows: <T>() => Array<T>;
    setColumnFilter: (name: string, value?: any) => void
    table?: ReactTable<any>
    getPageOptions: () => PageOptions
}

export const Table = forwardRef<TableRef, Props>((props, ref) => {
    const { columns, crudOptions, lazy, useQueryOptions, customTableOptions } = props.tableProps
    const queryClient = useGetQueryClient()

    if (crudOptions.toggleShowColumns === undefined) {
        crudOptions.toggleShowColumns = columns.find(column => column.meta?.toggleShow === true) ? true : false
    }

    if (lazy) {
        return (
            <QueryClientProvider client={queryClient}>
                <TableLazy
                    columns={columns}
                    crudOptions={crudOptions}
                    useQueryOptions={useQueryOptions}
                    customTableOptions={customTableOptions}
                    ref={ref}
                />
            </QueryClientProvider >
        )
    }

    return (
        <QueryClientProvider client={queryClient}>
            <TableEagle
                columns={columns}
                crudOptions={crudOptions}
                useQueryOptions={useQueryOptions}
                customTableOptions={customTableOptions}
                ref={ref}
            />
        </QueryClientProvider >
    )
})

export { TableToolbar } from './TableToolbar'
export { Tbody } from './Tbody'
export { Pagination } from './Pagination/Pagination'
export { Thead } from './Thead'
export { ModalForm } from './ModalForm'
export { IndeterminateCheckbox } from './IndeterminateCheckbox'