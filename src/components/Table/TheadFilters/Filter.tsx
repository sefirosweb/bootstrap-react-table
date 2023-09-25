import React from "react"
import { FilterDates } from "./FilterDates"
import { FilterDatesTime } from "./FilterDatesTime"
import { FilterNumbers } from "./FilterNumbers"
import { FilterSelect } from "./FilterSelect"
import { FilterText } from "./FilterText"
import { CrudOptions, Filter as FilterType } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

type Props = {
    type?: 'text' | 'number' | 'date' | 'datetime' | 'select'
    header_id: string
    tableFilters: FilterType,
    setTableFilters: React.Dispatch<React.SetStateAction<FilterType>>,
    columnDef: ColumnDef<any>,
}

export const Filter: React.FC<Props> = (props) => {
    const { type, header_id, columnDef, tableFilters, setTableFilters } = props

    return (
        <>
            {(!type || type === 'text') && (
                <FilterText
                    headerId={header_id}
                    tableFilters={tableFilters}
                    setTableFilters={setTableFilters}
                />
            )}

            {(type === 'number') && (
                <FilterNumbers
                    headerId={header_id}
                    tableFilters={tableFilters}
                    setTableFilters={setTableFilters}
                />
            )}

            {(type === 'date') && (
                <FilterDates
                    headerId={header_id}
                    tableFilters={tableFilters}
                    setTableFilters={setTableFilters}
                />
            )}

            {(type === 'datetime') && (
                <FilterDatesTime
                    headerId={header_id}
                    tableFilters={tableFilters}
                    setTableFilters={setTableFilters}
                />
            )}

            {(type === 'select') && (
                <FilterSelect
                    headerId={header_id}
                    tableFilters={tableFilters}
                    setTableFilters={setTableFilters}
                    columnDef={columnDef}
                />
            )}
        </>
    )
}