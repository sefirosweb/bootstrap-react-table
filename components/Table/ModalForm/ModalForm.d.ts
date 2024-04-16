import { CellContext, Table } from '@tanstack/react-table';
import { ActionCrud } from '../../../types';
import { default as React } from '../../../../node_modules/react';

type Props = {
    action: ActionCrud;
    cell?: CellContext<any, unknown>;
    table: Table<any>;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    isLoadingModal: boolean;
};
export declare const ModalForm: React.FC<Props>;
export {};
