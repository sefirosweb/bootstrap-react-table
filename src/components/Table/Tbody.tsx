import { flexRender, Table } from "@tanstack/react-table";
import React from "react";
import style from "./Tbody.module.scss"

type Props = {
    table: Table<any>,
    isLoading: boolean,
}


export const Tbody: React.FC<Props> = (props) => {
    const { table } = props



    const TrLoading: React.FC<{}> = () => (
        <tr>
            <td colSpan={100} className={props.isLoading ? style.isLoading : style.trBorder}>
            </td>
        </tr>
    )



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
