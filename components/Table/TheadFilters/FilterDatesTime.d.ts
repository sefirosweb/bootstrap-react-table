import React from "react";
type CustomType = [string | null, string | null];
type Props = {
    headerId: string;
    value?: CustomType;
    setValue: (newValue?: CustomType) => void;
};
export declare const FilterDatesTime: React.FC<Props>;
export {};
