import React, { InputHTMLAttributes } from 'react';
interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value?: string;
    onChange?: (value: string) => void;
    delayFilter: number;
}
export declare const DebouncedInput: React.FC<Props>;
export {};
