import React from "react"
import { Form } from "react-bootstrap";

const parser = (value: unknown): boolean => {
    if (typeof value === "string") {
        return value === "1" || value === "true";
    }

    if (typeof value === "number") {
        return value === 1;
    }

    if (typeof value === "boolean") {
        return value;
    }

    return false;
};

type CustomProps = {
    value?: unknown
    setValue: (value?: string) => void
}

type Props = CustomProps & Omit<React.ComponentProps<typeof Form.Control>, 'onChange'>;

export const FormCheckbox: React.FC<Props> = ({ value, setValue, ...props }) => {
    const checked: boolean = parser(value);

    return (
        <Form.Check
            type="switch"
            {...props}
            checked={checked}
            onChange={() => setValue(checked ? "0" : "1")}
        />
    )
}