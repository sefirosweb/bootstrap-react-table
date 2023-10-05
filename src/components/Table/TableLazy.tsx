import { CrudOptions, PageOptions, QueryPage } from "@/types";
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Table, PropsRef } from "./Table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRef } from ".";

export type Props = {
    columns: Array<ColumnDef<any>>,
    crudOptions: CrudOptions<any>,
    useQueryOptions: UseQueryOptions<QueryPage<any>>,
}

export const TableLazy = forwardRef<TableRef, Props>((props, ref) => {
    const queryClient = useQueryClient()
    const refTable = useRef<PropsRef>(null)

    const pageSizes = props.crudOptions.pageSizes ?? [10, 25, 50, 100, 500]

    const INITIAL_PAGE_OPTIONS: PageOptions = {
        page: 1,
        pageSize: props.crudOptions.pageSize ?? pageSizes[0],
        filters: [],
        orders: [],
    }

    const [pageOptions, setPageOptions] = useState<PageOptions>(INITIAL_PAGE_OPTIONS)

    const [queryKey, setQueryKey] = useState([props.useQueryOptions.queryKey, pageOptions])

    useEffect(() => {
        setQueryKey([props.useQueryOptions.queryKey, pageOptions])
    }, [props.useQueryOptions.queryKey, pageOptions])

    const INITIAL_DATA: QueryPage<any> = {
        results: [],
        pages: 1,
        nextCursor: null,
        prevCursor: null,
        currentPage: 1,
        totalRows: 0,
    }

    const useQueryOptions: UseQueryOptions<QueryPage<any>> = {
        staleTime: Infinity,
        initialDataUpdatedAt: 0,
        keepPreviousData: true,
        initialData: INITIAL_DATA,
        ...props.useQueryOptions,
        queryKey,
        queryFn: (params) => {
            if (!props.useQueryOptions.queryFn) {
                return Promise.reject(new Error('No query function provided'));
            }

            const pageConfig = params.queryKey[1] as PageOptions

            params.meta = {
                page: pageConfig?.page ?? pageOptions.page,
                pageSize: pageConfig?.pageSize ?? pageOptions.pageSize,
                filters: pageConfig?.filters ?? [],
                orders: pageConfig?.orders ?? [],
            }

            return props.useQueryOptions.queryFn(params)
        },
    }

    const { data: tableData, isFetching } = useQuery(useQueryOptions)

    const refreshTable = () => {
        queryClient.invalidateQueries([props.useQueryOptions.queryKey])
    }

    useImperativeHandle(ref, () => ({
        refreshTable,
        setShowModal: (show: boolean) => refTable.current?.setShowModal(show),
        setIsLoadingModal: (isLoading: boolean) => refTable.current?.setIsLoadingModal(isLoading)
    }));

    return (
        <Table
            columns={props.columns}
            crudOptions={props.crudOptions}
            tableData={tableData?.results ?? []}
            isFetching={isFetching}
            isLazy={true}
            pageOptions={pageOptions}
            setPageOptions={setPageOptions}
            pages={tableData?.pages ?? 1}
            pageSizes={pageSizes}
            totalRows={tableData?.totalRows ?? 0}
            refreshTable={refreshTable}
            queryKey={queryKey}
            ref={refTable}
        />
    )

})