import { UseQueryOptions } from "@tanstack/react-query";
import React from "react";
import { Form } from "react-bootstrap";
import { SelectOption } from '../../index';
export type Props = React.ComponentProps<typeof Form.Select> & {
    addNullOption?: boolean;
    useQueryOptions?: UseQueryOptions<Array<SelectOption>>;
    handleChange: (option: SelectOption | undefined) => void;
};
export declare const FormSelect: React.FC<Props>;
