import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap";
import { SelectOption } from "@/index";

export type Props = React.ComponentProps<typeof Form.Select> & {
    addNullOption?: boolean
    useQueryOptions?: UseQueryOptions<Array<SelectOption>>
    handleChange: (option: SelectOption | undefined) => void
}

export const FormSelect: React.FC<Props> = ({ addNullOption, value, useQueryOptions: useQueryOptionsProps, handleChange, ...props }) => {
    const [selectedOption, setSelectedOption] = useState<string>("");

    if (!useQueryOptionsProps) throw new Error("useQueryOptions is required");

    const useQueryOptions: UseQueryOptions<Array<SelectOption>> = {
        staleTime: Infinity,
        initialData: [],
        initialDataUpdatedAt: 0,
        keepPreviousData: true,
        ...useQueryOptionsProps,
    }

    const { data: selectData } = useQuery(useQueryOptions)

    useEffect(() => {
        if (value === undefined) {
            setSelectedOption("");
        } else if (typeof value === "string") {
            setSelectedOption(value);
        } else if (typeof value === "number") {
            setSelectedOption(value.toString());
        }
    }, [value]);

    return (
        <Form.Select
            {...props}
            value={selectedOption}
            onChange={(e) => {
                setSelectedOption(e.target.value)
                const selectedOptionFilter = selectData?.find(filter => filter.value === e.target.value)
                handleChange(selectedOptionFilter)
            }}
        >
            {addNullOption && (
                <option key={0} value="">
                    {""}
                </option>
            )}

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