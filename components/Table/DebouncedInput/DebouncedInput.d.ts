import React from 'react';
import { Form } from 'react-bootstrap';
type CustomProps = {
    value?: string;
    onChange?: (value: string) => void;
    delayFilter: number;
};
type Props = CustomProps & Omit<React.ComponentProps<typeof Form.Control>, 'onChange' | 'value'>;
export declare const DebouncedInput: React.FC<Props>;
export {};
