import React, { useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { FormSelect, Filter, SelectOption } from "@/index"

type Props = {
    headerId: string
    tableFilters: Filter,
    setTableFilters: React.Dispatch<React.SetStateAction<Filter>>,
    columnDef: ColumnDef<any>
}

export const FilterSelect: React.FC<Props> = (props) => {
    const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(undefined);

    if (!props.columnDef.meta?.useQueryOptions) {
        console.log('err')
        throw new Error('FilterSelect requires useQueryOptions')
    }

    useEffect(() => {
        const newTableFilters = { ...props.tableFilters }
        if (!selectedOption) {
            delete newTableFilters[props.headerId]
        } else {
            newTableFilters[props.headerId] = selectedOption.value
        }

        props.setTableFilters(newTableFilters)
    }, [selectedOption])

    return (
        <FormSelect
            useQueryOptions={props.columnDef.meta.useQueryOptions}
            handleChange={(option) => setSelectedOption(option)}
            addNullOption={true}
        />
    )
}