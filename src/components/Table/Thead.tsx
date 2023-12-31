import React, { useContext, useEffect, useState } from "react";
import { ColumnFiltersState, flexRender, Header, Table } from "@tanstack/react-table";
import { Filter } from "./TheadFilters";
import { TableContext } from "./TableContext";
import { Filter as FilterType } from "@/index";
import { isEqual } from "lodash";

type Props = {
    table: Table<any>,
}

const sortDirection = (header: Header<any, unknown>) => {
    if (!header.column.getCanSort()) return null;

    const direction = header.column.getIsSorted()
    if (!direction) return " -"

    if (direction === "asc") return "🔼"
    if (direction === "desc") return "🔽"
}

export const Thead: React.FC<Props> = (props) => {
    const [tableFilters, setTableFilters] = useState<FilterType>({})
    const tableContext = useContext(TableContext)

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newColumnFilters: ColumnFiltersState = []
            for (const key in tableFilters) {
                const filter = tableFilters[key]
                newColumnFilters.push({
                    id: key,
                    value: filter,
                })
            }

            if (isEqual(newColumnFilters, tableContext.pageOptions.columnFilters ?? [])) return
            const newPageOptions = { ...tableContext.pageOptions, columnFilters: newColumnFilters }
            newPageOptions.page = 1

            tableContext.setPageOptions(newPageOptions)
        }, tableContext.crudOptions.delayFilter ?? 230);

        return () => clearTimeout(timeout);
    }, [tableFilters, tableContext.pageOptions]);


    useEffect(() => {
        if (!tableContext.pageOptions.columnFilters) return
        const newTableFilters: FilterType = {}
        for (const filter of tableContext.pageOptions.columnFilters) {
            newTableFilters[filter.id] = filter.value
        }

        if (isEqual(newTableFilters, tableFilters)) return
        setTableFilters(newTableFilters)
    }, [tableContext.pageOptions.columnFilters]);

    return (
        <thead>
            {props.table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder ? null : (
                                <div
                                    {...{
                                        className: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                                        onClick: header.column.getToggleSortingHandler(),
                                    }}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}

                                    {sortDirection(header)}
                                </div>
                            )}
                        </th>
                    ))}
                </tr>
            ))
            }

            {
                props.table.getHeaderGroups().some(headerGroup => headerGroup.headers.some(header => header.column.columnDef.meta?.filterable)) &&
                props.table.getHeaderGroups().map((headerGroup) => (
                    <tr key={`filter_header_group_${headerGroup.id}`}>
                        {headerGroup.headers.map((header) => (
                            <th key={`filter_header_${header.id}`} colSpan={header.colSpan}>
                                {header.isPlaceholder ? null : (
                                    <>
                                        {!header.column.columnDef.meta?.filterable && (
                                            <>--</>
                                        )}

                                        {header.column.columnDef.meta?.filterable && (
                                            <>
                                                <Filter
                                                    header={header}
                                                    tableFilters={tableFilters}
                                                    setTableFilters={setTableFilters}
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </th>
                        ))}
                    </tr>
                ))
            }


        </thead >
    )
}
