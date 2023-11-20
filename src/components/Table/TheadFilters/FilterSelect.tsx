import React, { useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { FormSelect } from "@/index"

type Props = {
    headerId: string
    value?: string,
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>,
    columnDef: ColumnDef<any>
}

export const FilterSelect: React.FC<Props> = (props) => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

    if (!props.columnDef.meta?.useQueryOptions) {
        throw new Error('FilterSelect requires useQueryOptions')
    }

    useEffect(() => {
        props.setValue(selectedOption)
    }, [selectedOption])

    return (
        <FormSelect
            id={`filter_${props.headerId}`}
            name={`filter_${props.headerId}`}
            useQueryOptions={props.columnDef.meta.useQueryOptions}
            setValue={setSelectedOption}
            value={props.value}
        />
    )
}