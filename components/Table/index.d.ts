/// <reference types="react" />
import { TableProps } from '../../types';
import { type Table as ReactTable } from "@tanstack/react-table";
export type Props = {
    tableProps: TableProps<any>;
};
export type TableRef = {
    refreshTable: () => void;
    setShowModal: (show: boolean) => void;
    setIsLoadingModal: (isLoading: boolean) => void;
    getSelectedRows: <T>() => Array<T>;
    setColumnFilter: (name: string, value?: any) => void;
    table?: ReactTable<any>;
};
export declare const Table: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<TableRef>>;
export { TableToolbar } from './TableToolbar';
export { Tbody } from './Tbody';
export { Pagination } from './Pagination/Pagination';
export { Thead } from './Thead';
export { ModalForm } from './ModalForm';
export { IndeterminateCheckbox } from './IndeterminateCheckbox';
