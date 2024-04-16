import { Header } from '@tanstack/react-table';
import { Filter as FilterType } from '../../../types';
import { default as React } from '../../../../node_modules/react';

type Props = {
    header: Header<any, unknown>;
    tableFilters: FilterType;
    setTableFilters: React.Dispatch<React.SetStateAction<FilterType>>;
};
export declare const Filter: React.FC<Props>;
export {};
