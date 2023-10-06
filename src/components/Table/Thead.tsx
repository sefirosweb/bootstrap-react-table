import React, { useContext, useEffect, useState } from "react";
import { flexRender, Header, Table } from "@tanstack/react-table";
import { Filter as FilterType } from "@/index";
import { Filter } from "./TheadFilters";
import { TableContext } from "./TableContext";

type Props = {
    table: Table<any>,
    tableFilters: FilterType,
    setTableFilters: React.Dispatch<React.SetStateAction<FilterType>>,
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
    const { crudOptions } = useContext(TableContext)

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.setTableFilters(tableFilters)
        }, crudOptions.delayFilter ?? 230);

        return () => clearTimeout(timeout);
    }, [tableFilters]);

    return (
        <thead>
            {props.table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.filter(header => header.column.columnDef.meta?.visible !== false).map((header) => (
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
                        {headerGroup.headers.filter(header => header.column.columnDef.meta?.visible !== false).map((header) => (
                            <th key={`filter_header_${header.id}`} colSpan={header.colSpan}>
                                {header.isPlaceholder ? null : (
                                    <>
                                        {!header.column.columnDef.meta?.filterable && (
                                            <>--</>
                                        )}

                                        {header.column.columnDef.meta?.filterable && (
                                            <>
                                                <Filter
                                                    type={header.column.columnDef.meta?.type}
                                                    columnDef={header.column.columnDef}
                                                    header_id={header.id}
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
