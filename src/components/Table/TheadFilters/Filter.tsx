import React from "react"
import { FilterDates } from "./FilterDates"
import { FilterDatesTime } from "./FilterDatesTime"
import { FilterNumbers } from "./FilterNumbers"
import { FilterSelect } from "./FilterSelect"
import { FilterText } from "./FilterText"
import { Filter as FilterType } from "@/types"
import { Header } from "@tanstack/react-table"

type Props = {
    header: Header<any, unknown>,
    tableFilters: FilterType,
    setTableFilters: React.Dispatch<React.SetStateAction<FilterType>>,
}

export const Filter: React.FC<Props> = (props) => {
    const { header, tableFilters, setTableFilters } = props

    const headerId = header.id
    const columnDef = header.column.columnDef
    const type = header.column.columnDef.meta?.type

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

    if (columnDef.meta?.customFilter) {
        const CustomFilter = columnDef.meta.customFilter
        return <CustomFilter header={{ ...header.getContext() }} value={value} setValue={setValue} />
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

            {(type === 'multiselect') && (
                <FilterText
                    headerId={headerId}
                    value={value}
                    setValue={setValue}
                />
            )}
        </>
    )
}