/// <reference types="react" />
import { CrudOptions, QueryEagle } from '../../types';
import { UseQueryOptions } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { TableRef } from ".";
export type Props = {
    columns: Array<ColumnDef<any>>;
    crudOptions: CrudOptions<any>;
    useQueryOptions: UseQueryOptions<QueryEagle<any>>;
};
export declare const TableEagle: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<TableRef>>;
