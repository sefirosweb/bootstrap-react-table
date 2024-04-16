import { Form } from 'react-bootstrap';
import { default as React } from '../../../node_modules/react';

type CustomProps = {
    value?: unknown;
    setValue: (value?: string) => void;
};
type Props = CustomProps & Omit<React.ComponentProps<typeof Form.Control>, 'onChange'>;
export declare const FormCheckbox: React.FC<Props>;
export {};
