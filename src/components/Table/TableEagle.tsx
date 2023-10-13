import { CrudOptions, PageOptions, QueryEagle } from "@/types";
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Table, PropsRef } from "./Table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRef } from ".";
import { TableContext } from "./TableContext";
import { isEqual, isFunction } from "lodash";

export type Props = {
    columns: Array<ColumnDef<any>>,
    crudOptions: CrudOptions<any>,
    useQueryOptions: UseQueryOptions<QueryEagle<any>>,
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

    const [queryKey, setQueryKey] = useState([props.useQueryOptions.queryKey])

    useEffect(() => {
        setQueryKey([props.useQueryOptions.queryKey])
    }, [props.useQueryOptions.queryKey])

    const INITIAL_DATA: QueryEagle<any> = {
        results: [],
    }

    const useQueryOptions: UseQueryOptions<QueryEagle<any>> = {
        staleTime: Infinity,
        initialDataUpdatedAt: 0,
        keepPreviousData: true,
        initialData: INITIAL_DATA,
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
        queryClient.invalidateQueries([props.useQueryOptions.queryKey])
    }

    useImperativeHandle(ref, () => ({
        refreshTable,
        setShowModal: (show: boolean) => refTable.current?.setShowModal(show),
        setIsLoadingModal: (isLoading: boolean) => refTable.current?.setIsLoadingModal(isLoading),
    }));

    return (
        <TableContext.Provider value={{
            columns: props.columns,
            crudOptions: props.crudOptions,
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