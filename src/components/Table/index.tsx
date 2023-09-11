import { Ref, forwardRef } from "react"
import { Table as TableFw, Props, PropsRef } from "./Table"
import { QueryClientProvider } from "@tanstack/react-query"
import { useGetQueryClient } from "../../lib/useGetQueryClient"

export const Table = forwardRef<PropsRef, Props>((props, ref) => {
    const queryClient = useGetQueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <TableFw {...props} ref={ref} />
        </QueryClientProvider >
    )
})

export { TableToolbar } from './TableToolbar'
export { Tbody } from './Tbody'
export { Tfooter } from './Tfooter'
export { Thead } from './Thead'
export { ModalForm } from './ModalForm'