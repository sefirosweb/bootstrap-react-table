import { useContext } from "react"
import { Pagination as CPagination } from "./Pagination"
import { TableContext } from "../TableContext"
import { Table } from "@tanstack/react-table"

type Props = {
    table: Table<any>,
}

export const Pagination: React.FC<Props> = ({ table }) => {
    const tableContext = useContext(TableContext)

    if (tableContext.isLazy) return (
        <CPagination
            pages={tableContext.pages ?? 1}
            currentPage={tableContext.pageOptions.page}
            totalRows={tableContext.totalRows ?? 0}

            handleFirstPage={() => tableContext.setPageOptions({ ...tableContext.pageOptions, page: 1 })}
            handlePrevPage={() => tableContext.setPageOptions({ ...tableContext.pageOptions, page: tableContext.pageOptions.page - 1 })}
            handleNextPage={() => tableContext.setPageOptions({ ...tableContext.pageOptions, page: tableContext.pageOptions.page + 1 })}
            handleLastPage={() => tableContext.setPageOptions({ ...tableContext.pageOptions, page: tableContext.pages ?? 1 })}

            firstPageDisabled={tableContext.pages === undefined || tableContext.pageOptions.page <= 1}
            prevPageDisabled={tableContext.pages === undefined || tableContext.pageOptions.page <= 1}
            nextPageDisabled={tableContext.pages === undefined || tableContext.pageOptions.page >= tableContext.pages}
            lastPageDisabled={tableContext.pages === undefined || tableContext.pageOptions.page >= tableContext.pages}


            pageSizes={tableContext.pageSizes}
            pageSize={tableContext.pageOptions.pageSize}
            setPageSize={(pageSize) => tableContext.setPageOptions({ ...tableContext.pageOptions, pageSize: pageSize, page: 1 })}
        />
    )

    return (
        <CPagination
            pages={table.getPageCount() === 0 ? 1 : table.getPageCount()}
            currentPage={table.getState().pagination.pageIndex + 1}
            totalRows={table.getFilteredRowModel().rows.length}

            handleFirstPage={() => tableContext.setPageOptions({ ...tableContext.pageOptions, page: 1 })}
            handlePrevPage={() => tableContext.setPageOptions({ ...tableContext.pageOptions, page: tableContext.pageOptions.page - 1 })}
            handleNextPage={() => tableContext.setPageOptions({ ...tableContext.pageOptions, page: tableContext.pageOptions.page + 1 })}
            handleLastPage={() => tableContext.setPageOptions({ ...tableContext.pageOptions, page: table.getPageCount() })}

            firstPageDisabled={!table.getCanPreviousPage()}
            prevPageDisabled={!table.getCanPreviousPage()}
            nextPageDisabled={!table.getCanNextPage()}
            lastPageDisabled={!table.getCanNextPage()}


            pageSizes={tableContext.pageSizes}
            pageSize={tableContext.pageOptions.pageSize}
            setPageSize={(pageSize) => {
                tableContext.setPageOptions({ ...tableContext.pageOptions, pageSize: pageSize })
                table.setPageSize(pageSize)
            }}
        />
    )
}