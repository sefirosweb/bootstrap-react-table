/// <reference types="react" />
import { type Table as ReactTable } from "@tanstack/react-table";
export type PropsRef = {
    setShowModal: (show: boolean) => void;
    setIsLoadingModal: (isLoading: boolean) => void;
    table: ReactTable<any>;
};
export declare const Table: import("react").ForwardRefExoticComponent<import("react").RefAttributes<PropsRef>>;
