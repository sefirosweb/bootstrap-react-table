import { Table as ReactTable } from '@tanstack/react-table';

export type PropsRef = {
    setShowModal: (show: boolean) => void;
    setIsLoadingModal: (isLoading: boolean) => void;
    table: ReactTable<any>;
};
export declare const Table: import('../../../node_modules/react').ForwardRefExoticComponent<import('../../../node_modules/react').RefAttributes<PropsRef>>;
