import React from "react"
import { FilterDates } from "./FilterDates"
import { FilterDatesTime } from "./FilterDatesTime"
import { FilterNumbers } from "./FilterNumbers"
import { FilterSelect } from "./FilterSelect"
import { FilterText } from "./FilterText"
import { FieldType, Filter as FilterType } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

type Props = {
    type?: FieldType
    headerId: string
    tableFilters: FilterType,
    setTableFilters: React.Dispatch<React.SetStateAction<FilterType>>,
    columnDef: ColumnDef<any>,
}

export const Filter: React.FC<Props> = (props) => {
    const { type, headerId, columnDef, tableFilters, setTableFilters } = props

    const value = tableFilters[headerId] ?? undefined
    const setValue = (newValue?: any) => {
        const newTableFilters = structuredClone(tableFilters)

        if (!newValue) {
            delete newTableFilters[headerId]
        } else {
            newTableFilters[headerId] = newValue
        }

        setTableFilters(newTableFilters)
    }

    return (
        <>
            {(!type || type === 'text') && (
                <FilterText
                    headerId={headerId}
                    value={value}
                    setValue={setValue}
                />
            )}

            {(type === 'number') && (
                <FilterNumbers
                    headerId={headerId}
                    value={value}
                    setValue={setValue}
                />
            )}

            {(type === 'date') && (
                <FilterDates
                    headerId={headerId}
                    value={value}
                    setValue={setValue}
                />
            )}

            {(type === 'datetime') && (
                <FilterDatesTime
                    headerId={headerId}
                    value={value}
                    setValue={setValue}
                />
            )}

            {(type === 'select') && (
                <FilterSelect
                    headerId={headerId}
                    value={value}
                    setValue={setValue}
                    columnDef={columnDef}
                />
            )}
        </>
    )
}