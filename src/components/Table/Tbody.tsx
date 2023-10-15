import { flexRender, Table } from "@tanstack/react-table";
import React, { useContext, useMemo } from "react";
import { TableContext } from "./TableContext";
import { LoaderDiv, LoaderBar, LoaderTD } from './style'

type Props = {
    table: Table<any>,
}

export const Tbody: React.FC<Props> = (props) => {
    const { table } = props
    const { isFetching, crudOptions } = useContext(TableContext)

    const TrLoading = useMemo(() => {
        const TrLoading: React.FC<{}> = () => (
            <tr>
                <LoaderTD colSpan={100} >
                    <LoaderDiv>
                        {isFetching && <LoaderBar />}
                    </LoaderDiv>
                </LoaderTD>
            </tr>
        )
        return TrLoading
    }, [isFetching])

    return (
        <tbody>
            <TrLoading />

            {table.getRowModel().rows.map((row) => (
                <tr
                    key={row.id}
                    style={crudOptions.getRowStyles ? crudOptions.getRowStyles(row) : {}}
                    className={crudOptions.getRowClass ? crudOptions.getRowClass(row) : ''}
                >
                    {row.getVisibleCells()
                        .map((cell) => (
                            <td
                                style={cell.column.columnDef.meta?.getCellStyle ? cell.column.columnDef.meta?.getCellStyle(cell.getContext()) : undefined}
                                className={cell.column.columnDef.meta?.getCellClass ? cell.column.columnDef.meta?.getCellClass(cell.getContext()) : undefined}
                                key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                </tr>
            ))}

            {table.getRowModel().rows.length > 0 && <TrLoading />}
        </tbody>
    )
}
