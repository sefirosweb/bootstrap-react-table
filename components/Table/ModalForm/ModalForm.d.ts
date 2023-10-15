import React from "react";
import { ActionCrud } from "../../../types";
import { CellContext, Table } from "@tanstack/react-table";
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
