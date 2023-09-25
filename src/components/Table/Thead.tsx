import React, { useEffect, useState } from "react";
import { flexRender, Table } from "@tanstack/react-table";
import { CrudOptions, Filter as FilterType } from "@/index";
import { Filter } from "./TheadFilters";

type Props = {
    table: Table<any>,
    tableFilters: FilterType,
    setTableFilters: React.Dispatch<React.SetStateAction<FilterType>>,
    crudOptions: CrudOptions<any>,
}

export const Thead: React.FC<Props> = (props) => {
    const [tableFilters, setTableFilters] = useState<FilterType>({})

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.setTableFilters(tableFilters)
        }, props.crudOptions.delayFilter ?? 230);

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
                                        className: header.column.getCanSort() ? "select-none" : "",
                                        onClick: header.column.getToggleSortingHandler(),
                                    }}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}

                                    {header.column.getCanSort()
                                        ? { asc: "🔼", desc: "🔽", }[header.column.getIsSorted() as string] ?? " -"
                                        : null}
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
