import React from "react";
import { ColumnDef } from "@tanstack/react-table";
type Props = {
    headerId: string;
    value?: string;
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
    columnDef: ColumnDef<any>;
};
export declare const FilterSelect: React.FC<Props>;
export {};
