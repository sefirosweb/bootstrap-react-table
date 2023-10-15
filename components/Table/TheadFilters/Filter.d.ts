import React from "react";
import { Filter as FilterType } from '../../../types';
import { Header } from "@tanstack/react-table";
type Props = {
    header: Header<any, unknown>;
    tableFilters: FilterType;
    setTableFilters: React.Dispatch<React.SetStateAction<FilterType>>;
};
export declare const Filter: React.FC<Props>;
export {};
