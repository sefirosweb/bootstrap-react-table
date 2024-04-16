import { CellContext, Column } from '@tanstack/react-table';

type Props = {
    column: Column<any>;
    isLoadingModal: boolean;
    value?: any;
    setValue: (newValue?: any) => void;
    cellSelected?: CellContext<any, unknown>;
};
export declare const FormFields: React.FC<Props>;
export {};
