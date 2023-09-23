import { forwardRef } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { useGetQueryClient } from "../../lib/useGetQueryClient"
import { TableProps } from "@/types"
import { TableEagle } from "./TableEagle"
import { TableLazy, PropsRef } from "./TableLazy"

export type Props = {
    tableProps: TableProps<any>
}

export const Table = forwardRef<PropsRef, Props>((props, ref) => {
    const { columns, crudOptions, lazy, useQueryOptions } = props.tableProps
    const queryClient = useGetQueryClient()

    if (lazy) {
        return (
            <QueryClientProvider client={queryClient}>
                <TableLazy
                    columns={columns}
                    crudOptions={crudOptions}
                    useQueryOptions={useQueryOptions}
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
                ref={ref}
            />
        </QueryClientProvider >
    )
})

export { TableToolbar } from './TableToolbar'
export { Tbody } from './Tbody'
export { Tfooter } from './Tfooter'
export { Thead } from './Thead'
export { ModalForm } from './ModalForm'