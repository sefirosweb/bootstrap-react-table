import { flexRender, Table } from "@tanstack/react-table";
import React, { useContext, useMemo } from "react";
import style from "./Tbody.module.scss"
import { TableContext } from "./TableContext";

type Props = {
    table: Table<any>,
}

export const Tbody: React.FC<Props> = (props) => {
    const { table } = props
    const { isFetching } = useContext(TableContext)

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
                >
                    {row.getVisibleCells()
                        .filter(cell => cell.column.columnDef.meta?.visible !== false)
                        .map((cell) => (
                            <td
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
