import React from "react";
type CustomType = [number | null, number | null];
type Props = {
    headerId: string;
    value?: CustomType;
    setValue: (newValue?: CustomType) => void;
};
export declare const FilterNumbers: React.FC<Props>;
export {};
