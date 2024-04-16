import { TableRef } from '.';
import { ColumnDef } from '@tanstack/react-table';
import { UseQueryOptions } from '@tanstack/react-query';
import { CrudOptions, CustomTableOptions, QueryPage } from '../../types';

export type Props = {
    columns: Array<ColumnDef<any>>;
    crudOptions: CrudOptions<any>;
    useQueryOptions: UseQueryOptions<QueryPage<any>>;
    customTableOptions?: CustomTableOptions<any>;
};
export declare const TableLazy: import('../../../node_modules/react').ForwardRefExoticComponent<Props & import('../../../node_modules/react').RefAttributes<TableRef>>;
