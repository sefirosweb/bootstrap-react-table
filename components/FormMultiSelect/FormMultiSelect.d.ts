import { CellContext } from '@tanstack/react-table';
import { SelectOption, TableProps } from '../../index';
import { default as React } from '../../../node_modules/react';
import { UseQueryOptions } from '@tanstack/react-query';

export type Props = {
    multiSelectUnique?: boolean;
    useQueryOptions?: UseQueryOptions<Array<SelectOption>>;
    cellSelected?: CellContext<any, unknown>;
    handleChange: (option: Array<any>) => void;
    tableProps?: (cell?: CellContext<any, unknown>) => TableProps<any>;
};
export declare const FormMultiSelect: React.FC<Props>;
