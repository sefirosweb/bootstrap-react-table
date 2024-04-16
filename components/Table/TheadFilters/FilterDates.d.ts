import { default as React } from '../../../../node_modules/react';

type CustomType = [string | null, string | null];
type Props = {
    headerId: string;
    value?: CustomType;
    setValue: (newValue?: CustomType) => void;
};
export declare const FilterDates: React.FC<Props>;
export {};
