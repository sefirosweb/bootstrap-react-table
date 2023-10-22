import { CrudOptions, CustomTableOptions, PageOptions, QueryEagle } from "@/types";
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Table, PropsRef } from "./Table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRef } from ".";
import { TableContext } from "./TableContext";
import { isEqual } from "lodash";
import { setColumnFilter } from "@/lib/setColumnFilter";

export type Props = {
    columns: Array<ColumnDef<any>>,
    crudOptions: CrudOptions<any>,
    useQueryOptions: UseQueryOptions<QueryEagle<any>>,
    customTableOptions?: CustomTableOptions<any>
}

export const TableEagle = forwardRef<TableRef, Props>((props, ref) => {
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

    const [queryKey, setQueryKey] = useState<QueryKey>(props.useQueryOptions.queryKey ?? [])

    useEffect(() => {
        if (!props.useQueryOptions.queryKey) return
        setQueryKey(props.useQueryOptions.queryKey)
    }, [props.useQueryOptions.queryKey])

    const useQueryOptions: UseQueryOptions<QueryEagle<any>> = {
        staleTime: Infinity,
        ...props.useQueryOptions,
        queryKey,
        queryFn: (params) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (!props.useQueryOptions.queryFn) {
                        return Promise.reject(new Error('No query function provided'));
                    }

                    const pageConfig = params.queryKey[1] as PageOptions

                    params.meta = {
                        columnFilters: pageConfig?.columnFilters ?? [],
                        inputFilters: pageConfig?.inputFilters ?? [],
                        globalFilter: pageConfig?.globalFilter ?? "",
                    }

                    resolve(props.useQueryOptions.queryFn(params))
                });
            })
        },
    }

    const { data: tableData, isFetching } = useQuery(useQueryOptions)

    const refreshTable = () => {
        refTable.current?.table?.setRowSelection({});
        queryClient.invalidateQueries({ queryKey: props.useQueryOptions.queryKey })
    }

    useImperativeHandle(ref, () => ({
        refreshTable,
        setColumnFilter: (name: string, value?: any) => {
            const newPageOptions = setColumnFilter(name, value, pageOptions)
            if (isEqual(newPageOptions, pageOptions)) return

            refTable.current?.table.resetPageIndex()
            setPageOptions(newPageOptions)
        },
        setShowModal: (show: boolean) => refTable.current?.setShowModal(show),
        setIsLoadingModal: (isLoading: boolean) => refTable.current?.setIsLoadingModal(isLoading),
        table: refTable.current?.table,
        getSelectedRows: (): Array<any> => {
            if (!refTable.current) return [];
            return refTable.current.table
                .getSelectedRowModel()
                .flatRows.map((f) => f.original);
        },
    }));

    return (
        <TableContext.Provider value={{
            columns: props.columns,
            crudOptions: props.crudOptions,
            customTableOptions: props.customTableOptions,
            tableData: tableData?.results ?? [],
            isFetching: isFetching,
            isLazy: false,
            pageOptions: pageOptions,
            setPageOptions: setPageOptions,
            pageSizes: pageSizes,
            refreshTable: refreshTable,
            queryKey: queryKey,
        }}>
            <Table ref={refTable} />
        </TableContext.Provider>
    )

})