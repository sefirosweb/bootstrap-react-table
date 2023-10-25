import React, { useEffect } from "react"
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Form } from "react-bootstrap";
import { SelectOption } from "@/index";

export type Props = Omit<React.ComponentProps<typeof Form.Select>, 'value' | 'onChange'> & {
    useQueryOptions?: UseQueryOptions<Array<SelectOption>>
    value?: string
    setValue: (value?: string) => void
}

export const FormSelect: React.FC<Props> = ({ value, setValue, useQueryOptions: useQueryOptionsProps, ...props }) => {

    if (!useQueryOptionsProps) throw new Error("useQueryOptions is required");

    const useQueryOptions: UseQueryOptions<Array<SelectOption>> = {
        staleTime: Infinity,
        ...useQueryOptionsProps,
    }

    const { data: selectData } = useQuery(useQueryOptions)

    return (
        <Form.Select
            {...props}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
        >
            <option key={0} value="">{""}</option>
            {
                selectData?.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    );
                })
            }
        </Form.Select >
    )
}