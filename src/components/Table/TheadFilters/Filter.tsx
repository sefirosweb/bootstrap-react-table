import React, { useEffect, useState } from "react"
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
    crudOptions: CrudOptions<any>,
}

export const Filter: React.FC<Props> = (props) => {
    const { type, header_id, columnDef, crudOptions } = props
    const { delayFilter = 230 } = crudOptions

    const [tableFilters, setTableFilters] = useState<FilterType>(props.tableFilters)

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.setTableFilters(tableFilters)
        }, delayFilter);

        return () => clearTimeout(timeout);
    }, [tableFilters]);

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