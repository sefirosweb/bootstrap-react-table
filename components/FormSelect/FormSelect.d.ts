import React from "react";
import { UseQueryOptions } from "@tanstack/react-query";
import { Form } from "react-bootstrap";
import { SelectOption } from '../../index';
export type Props = Omit<React.ComponentProps<typeof Form.Select>, 'value' | 'onChange'> & {
    useQueryOptions?: UseQueryOptions<Array<SelectOption>>;
    value?: string;
    setValue: (value?: string) => void;
};
export declare const FormSelect: React.FC<Props>;
