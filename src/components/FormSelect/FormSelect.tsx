import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap";
import { SelectOption } from "@/index";

export type Props = React.ComponentProps<typeof Form.Select> & {
    useQueryOptions: UseQueryOptions<Array<SelectOption>>
    handleChange: (option: SelectOption | undefined) => void
}

export const FormSelect: React.FC<Props> = ({ useQueryOptions: useQueryOptionsProps, handleChange, ...props }) => {
    const [selectedOption, setSelectedOption] = useState<string | number>("");

    const useQueryOptions: UseQueryOptions<Array<SelectOption>> = {
        staleTime: Infinity,
        initialData: [],
        initialDataUpdatedAt: 0,
        keepPreviousData: true,
        ...useQueryOptionsProps,
    }

    const { data: selectData } = useQuery(useQueryOptions)

    useEffect(() => {
        const selectedOptionFilter = selectData?.find(filter => filter.value === selectedOption)

        handleChange(selectedOptionFilter)
    }, [selectedOption])


    return (
        <Form.Select
            {...props}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
        >
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