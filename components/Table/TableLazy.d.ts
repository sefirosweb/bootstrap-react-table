/// <reference types="react" />
import { CrudOptions, QueryPage } from '../../types';
import { UseQueryOptions } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { TableRef } from ".";
export type Props = {
    columns: Array<ColumnDef<any>>;
    crudOptions: CrudOptions<any>;
    useQueryOptions: UseQueryOptions<QueryPage<any>>;
};
export declare const TableLazy: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<TableRef>>;
