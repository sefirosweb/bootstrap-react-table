import { useContext } from "react"
import { Pagination as CPagination } from "./Pagination"
import { TableContext } from "../TableContext"
import { Table } from "@tanstack/react-table"

type Props = {
    table: Table<any>,
}

export const Pagination: React.FC<Props> = ({ table }) => {
    const props = useContext(TableContext)

    if (props.isLazy) return (
        <CPagination
            pages={props.pages ?? 1}
            currentPage={props.pageOptions.page}
            totalRows={props.totalRows ?? 0}

            handleFirstPage={() => props.setPageOptions({ ...props.pageOptions, page: 1 })}
            handlePrevPage={() => props.setPageOptions({ ...props.pageOptions, page: props.pageOptions.page - 1 })}
            handleNextPage={() => props.setPageOptions({ ...props.pageOptions, page: props.pageOptions.page + 1 })}
            handleLastPage={() => props.setPageOptions({ ...props.pageOptions, page: props.pages ?? 1 })}

            firstPageDisabled={props.pages === undefined || props.pageOptions.page <= 1}
            prevPageDisabled={props.pages === undefined || props.pageOptions.page <= 1}
            nextPageDisabled={props.pages === undefined || props.pageOptions.page >= props.pages}
            lastPageDisabled={props.pages === undefined || props.pageOptions.page >= props.pages}


            pageSizes={props.pageSizes}
            pageSize={props.pageOptions.pageSize}
            setPageSize={(pageSize) => props.setPageOptions({ ...props.pageOptions, pageSize: pageSize, page: 1 })}
        />
    )

    return (
        <CPagination
            pages={table.getPageCount() === 0 ? 1 : table.getPageCount()}
            currentPage={table.getState().pagination.pageIndex + 1}
            totalRows={table.getFilteredRowModel().rows.length}

            handleFirstPage={() => props.setPageOptions({ ...props.pageOptions, page: 1 })}
            handlePrevPage={() => props.setPageOptions({ ...props.pageOptions, page: props.pageOptions.page - 1 })}
            handleNextPage={() => props.setPageOptions({ ...props.pageOptions, page: props.pageOptions.page + 1 })}
            handleLastPage={() => props.setPageOptions({ ...props.pageOptions, page: table.getPageCount() })}

            firstPageDisabled={!table.getCanPreviousPage()}
            prevPageDisabled={!table.getCanPreviousPage()}
            nextPageDisabled={!table.getCanNextPage()}
            lastPageDisabled={!table.getCanNextPage()}


            pageSizes={props.pageSizes}
            pageSize={props.pageOptions.pageSize}
            setPageSize={(pageSize) => {
                props.setPageOptions({ ...props.pageOptions, pageSize: pageSize })
                table.setPageSize(pageSize)
            }}
        />
    )
}