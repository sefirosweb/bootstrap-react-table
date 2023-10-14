import { flexRender, Table } from "@tanstack/react-table";
import React, { useContext, useMemo } from "react";
import style from "./Tbody.module.scss"
import { TableContext } from "./TableContext";

type Props = {
    table: Table<any>,
}

export const Tbody: React.FC<Props> = (props) => {
    const { table } = props
    const { isFetching, crudOptions } = useContext(TableContext)

    const TrLoading = useMemo(() => {
        const TrLoading: React.FC<{}> = () => (
            <tr>
                <td colSpan={100} className={style.trBorder} >
                    <div className={style.loader}>
                        {isFetching && <div className={style.loaderBar}></div>}
                    </div>
                </td>
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
