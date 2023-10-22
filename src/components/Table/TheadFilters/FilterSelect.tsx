import React, { useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { FormSelect, SelectOption } from "@/index"

type Props = {
    headerId: string
    value?: string,
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>,
    columnDef: ColumnDef<any>
}

export const FilterSelect: React.FC<Props> = (props) => {
    const { headerId, value, setValue } = props
    const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(undefined);

    if (!props.columnDef.meta?.useQueryOptions) {
        throw new Error('FilterSelect requires useQueryOptions')
    }

    useEffect(() => {
        setValue(selectedOption?.value)
    }, [selectedOption])

    return (
        <FormSelect
            id={`filter_${headerId}`}
            name={`filter_${headerId}`}
            useQueryOptions={props.columnDef.meta.useQueryOptions}
            handleChange={(option) => setSelectedOption(option)}
            value={value}
            addNullOption={true}
        />
    )
}