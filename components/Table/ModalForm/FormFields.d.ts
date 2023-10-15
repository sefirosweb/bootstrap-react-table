/// <reference types="react" />
import { CellContext, Column } from "@tanstack/react-table";
import { FormDataType } from '../../../index';
type Props = {
    column: Column<any>;
    isLoadingModal: boolean;
    formData: FormDataType;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
    cellSelected?: CellContext<any, unknown>;
};
export declare const FormFields: React.FC<Props>;
export {};
