import { CrudOptions, PageOptions } from '../../types';
import { QueryKey } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
export interface TableContext {
    columns: Array<ColumnDef<any>>;
    crudOptions: CrudOptions<any>;
    tableData: Array<any>;
    isFetching: boolean;
    isLazy: boolean;
    pageSizes: Array<number>;
    pageOptions: PageOptions;
    setPageOptions: React.Dispatch<React.SetStateAction<PageOptions>>;
    pages?: number;
    totalRows?: number;
    refreshTable: () => void;
    queryKey: QueryKey;
}
export declare const TableContext: React.Context<TableContext>;
