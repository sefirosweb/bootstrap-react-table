import React, { useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { FormSelect } from "@/index"
import { isEqual } from "lodash"

type Props = {
    headerId: string
    value?: string,
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>,
    columnDef: ColumnDef<any>
}

export const FilterSelect: React.FC<Props> = (props) => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(props?.value);

    if (!props.columnDef.meta?.useQueryOptions) {
        throw new Error('FilterSelect requires useQueryOptions')
    }

    useEffect(() => {
        if (isEqual(props.value, selectedOption)) return
        setSelectedOption(props.value)
    }, [props.value])

    const onChange = (newValue?: string) => {
        setSelectedOption(newValue);
        if (props.setValue) {
            props.setValue(newValue);
        }
    }

    return (
        <FormSelect
            id={`filter_${props.headerId}`}
            name={`filter_${props.headerId}`}
            useQueryOptions={props.columnDef.meta.useQueryOptions}
            value={selectedOption}
            setValue={(newValue) => onChange(newValue)}
        />
    )
}