import { Form } from 'react-bootstrap';
import { default as React } from '../../../../node_modules/react';

type CustomProps = {
    value?: string;
    onChange?: (value: string) => void;
    delayFilter: number;
};
type Props = CustomProps & Omit<React.ComponentProps<typeof Form.Control>, 'onChange' | 'value'>;
export declare const DebouncedInput: React.FC<Props>;
export {};
