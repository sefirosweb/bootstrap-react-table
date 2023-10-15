import React from "react";
import { Table } from "@tanstack/react-table";
type Props = {
    table: Table<any>;
    createButtonFn: () => void;
};
export declare const TableToolbar: React.FC<Props>;
export {};
