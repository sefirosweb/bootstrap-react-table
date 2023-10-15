import { UseQueryOptions } from "@tanstack/react-query";
import React from "react";
import { SelectOption, TableProps } from '../../index';
import { CellContext } from "@tanstack/react-table";
export type Props = {
    multiSelectUnique?: boolean;
    useQueryOptions?: UseQueryOptions<Array<SelectOption>>;
    cellSelected?: CellContext<any, unknown>;
    handleChange: (option: Array<any>) => void;
    tableProps?: (cell?: CellContext<any, unknown>) => TableProps<any>;
};
export declare const FormMultiSelect: React.FC<Props>;
