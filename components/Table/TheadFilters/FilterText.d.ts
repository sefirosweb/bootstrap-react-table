import { default as React } from '../../../../node_modules/react';

type Props = {
    headerId: string;
    value?: string;
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export declare const FilterText: React.FC<Props>;
export {};
