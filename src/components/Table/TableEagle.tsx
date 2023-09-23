import { CrudOptions, Filter, PageOptions, QueryEagle } from "@/types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { forwardRef, useState } from "react";
import { Table } from "./Table";
import { ColumnDef } from "@tanstack/react-table";

export type Props = {
    columns: Array<ColumnDef<any>>,
    crudOptions: CrudOptions<any>,
    useQueryOptions: UseQueryOptions<QueryEagle<any>>,
}

export type PropsRef = {

}

export const TableEagle = forwardRef<PropsRef, Props>((props, ref) => {
    const pageSizes = props.crudOptions.pageSizes ?? [10, 25, 50, 100, 500]

    const INITIAL_PAGE_OPTIONS: PageOptions = {
        page: 1,
        pageSize: props.crudOptions.pageSize ?? pageSizes[0],
        filters: [],
    }

    const [pageOptions, setPageOptions] = useState<PageOptions>(INITIAL_PAGE_OPTIONS)

    const INITIAL_DATA: QueryEagle<any> = {
        results: [],
    }

    const useQueryOptions: UseQueryOptions<QueryEagle<any>> = {
        staleTime: Infinity,
        initialDataUpdatedAt: 0,
        keepPreviousData: true,
        initialData: INITIAL_DATA,
        ...props.useQueryOptions,
        queryKey: [props.useQueryOptions.queryKey],
        queryFn: (params) => {
            if (!props.useQueryOptions.queryFn) {
                return Promise.reject(new Error('No query function provided'));
            }

            const pageConfig = params.queryKey[1] as PageOptions

            params.meta = {
                filters: pageConfig?.filters ?? [],
            }

            return props.useQueryOptions.queryFn(params)
        },
    }

    const { data: tableData, isFetching } = useQuery(useQueryOptions)

    return (
        <div>
            <div>
                This is eagle
            </div>

            <Table
                columns={props.columns}
                crudOptions={props.crudOptions}
                tableData={tableData?.results ?? []}
                isFetching={isFetching}
                isLazy={false}
                pageOptions={pageOptions}
                setPageOptions={setPageOptions}
            />

        </div>
    )

})