import { Table } from '@tanstack/react-table';
import { default as React } from '../../../../node_modules/react';

type Props = {
    table: Table<any>;
    createButtonFn: () => void;
};
export declare const TableToolbar: React.FC<Props>;
export {};
