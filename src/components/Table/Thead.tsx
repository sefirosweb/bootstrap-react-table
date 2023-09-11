import React from "react";
import { flexRender, Table } from "@tanstack/react-table";
import { Filter } from "@/index";
import { FilterText, FilterNumbers, FilterDates, FilterDatesTime, FilterSelect } from "./TheadFilters";

type Props = {
    table: Table<any>,
    tableFilters: Filter,
    setTableFilters: React.Dispatch<React.SetStateAction<Filter>>,
}

export const Thead: React.FC<Props> = (props) => {

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
                                                {(!header.column.columnDef.meta?.type || header.column.columnDef.meta?.type === 'text') && (
                                                    <FilterText
                                                        headerId={header.id}
                                                        tableFilters={props.tableFilters}
                                                        setTableFilters={props.setTableFilters}
                                                    />
                                                )}

                                                {(header.column.columnDef.meta?.type === 'number') && (
                                                    <FilterNumbers
                                                        headerId={header.id}
                                                        tableFilters={props.tableFilters}
                                                        setTableFilters={props.setTableFilters}
                                                    />
                                                )}

                                                {(header.column.columnDef.meta?.type === 'date') && (
                                                    <FilterDates
                                                        headerId={header.id}
                                                        tableFilters={props.tableFilters}
                                                        setTableFilters={props.setTableFilters}
                                                    />
                                                )}

                                                {(header.column.columnDef.meta?.type === 'datetime') && (
                                                    <FilterDatesTime
                                                        headerId={header.id}
                                                        tableFilters={props.tableFilters}
                                                        setTableFilters={props.setTableFilters}
                                                    />
                                                )}

                                                {(header.column.columnDef.meta?.type === 'select') && (
                                                    <FilterSelect
                                                        headerId={header.id}
                                                        tableFilters={props.tableFilters}
                                                        setTableFilters={props.setTableFilters}
                                                        columnDef={header.column.columnDef}
                                                    />
                                                )}
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
