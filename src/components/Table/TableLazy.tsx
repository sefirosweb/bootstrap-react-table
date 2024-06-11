import { CrudOptions, CustomTableOptions, PageOptions, QueryPage } from "@/types";
import { UseQueryOptions, keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Table, PropsRef } from "./Table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRef } from ".";
import { TableContext } from "./TableContext";
import { setColumnFilter } from "@/lib/setColumnFilter";
import { isEqual } from "lodash";

export type Props = {
    columns: Array<ColumnDef<any>>,
    crudOptions: CrudOptions<any>,
    useQueryOptions: UseQueryOptions<QueryPage<any>>,
    customTableOptions?: CustomTableOptions<any>
}

export const TableLazy = forwardRef<TableRef, Props>((props, ref) => {
    const queryClient = useQueryClient()
    const refTable = useRef<PropsRef>(null)

    const pageSizes = props.crudOptions.pageSizes ?? [10, 25, 50, 100, 500]
    const INITIAL_PAGE_OPTIONS: PageOptions = {
        page: 1,
        pageSize: pageSizes[0],
        globalFilter: '',
        inputFilters: [],
        columnFilters: [],
        sorting: [],
    }

    const [pageOptionsLocal, setPageOptionsLocal] = useState<PageOptions>(Object.assign({ ...INITIAL_PAGE_OPTIONS }, props.crudOptions.pageOptions))
    const pageOptions = props.crudOptions.pageOptions || pageOptionsLocal
    const setPageOptions = props.crudOptions.setPageOptions || setPageOptionsLocal

    const [queryKey, setQueryKey] = useState([props.useQueryOptions.queryKey, pageOptions])

    useEffect(() => {
        setQueryKey([props.useQueryOptions.queryKey, pageOptions])
    }, [props.useQueryOptions.queryKey, pageOptions])

    const useQueryOptions: UseQueryOptions<QueryPage<any>> = {
        staleTime: Infinity,
        ...props.useQueryOptions,
        placeholderData: keepPreviousData,
        queryKey,
        queryFn: (params) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (!props.useQueryOptions.queryFn) {
                        return Promise.reject(new Error('No query function provided'));
                    }

                    const pageConfig = params.queryKey[1] as PageOptions

                    params.meta = {
                        page: pageConfig?.page ?? pageOptions.page,
                        pageSize: pageConfig?.pageSize ?? pageOptions.pageSize,
                        columnFilters: pageConfig?.columnFilters ?? [],
                        inputFilters: pageConfig?.inputFilters ?? [],
                        globalFilter: pageConfig?.globalFilter ?? "",
                        sorting: pageConfig?.sorting ?? [],
                    }

                    resolve(props.useQueryOptions.queryFn(params))
                });
            })

        },
    }

    const { data: tableData, isFetching } = useQuery(useQueryOptions)

    const refreshTable = () => {
        const queryKey = props.crudOptions.queryKeyOnRefresh ? [props.crudOptions.queryKeyOnRefresh] : [props.useQueryOptions.queryKey]
        queryClient.invalidateQueries({ queryKey })
    }

    useImperativeHandle(ref, () => ({
        refreshTable,
        setColumnFilter: (name: string, value?: any) => {
            const newPageOptions = setColumnFilter(name, value, pageOptions)
            if (isEqual(newPageOptions.columnFilters, pageOptions.columnFilters)) return

            newPageOptions.page = 1
            setPageOptions(newPageOptions)
        },
        setShowModal: (show: boolean) => refTable.current?.setShowModal(show),
        setIsLoadingModal: (isLoading: boolean) => refTable.current?.setIsLoadingModal(isLoading),
        table: refTable.current?.table,
        getSelectedRows: (): Array<any> => {
            return []
        },
        getPageOptions: (): PageOptions => pageOptions,
    }));

    return (
        <TableContext.Provider value={{
            columns: props.columns,
            crudOptions: props.crudOptions,
            customTableOptions: props.customTableOptions,
            tableData: tableData?.results ?? [],
            isFetching: isFetching,
            isLazy: true,
            pageOptions: pageOptions,
            setPageOptions: setPageOptions,
            pages: tableData?.pages ?? 1,
            pageSizes: pageSizes,
            totalRows: tableData?.totalRows ?? 0,
            refreshTable: refreshTable,
            queryKey: queryKey,
        }}>
            <Table ref={refTable} />
        </TableContext.Provider>
    )

})