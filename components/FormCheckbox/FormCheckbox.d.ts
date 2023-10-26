import React from "react";
import { Form } from "react-bootstrap";
type CustomProps = {
    value?: unknown;
    setValue: (value?: string) => void;
};
type Props = CustomProps & Omit<React.ComponentProps<typeof Form.Control>, 'onChange'>;
export declare const FormCheckbox: React.FC<Props>;
export {};
