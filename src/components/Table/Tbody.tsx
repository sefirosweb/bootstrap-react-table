import { flexRender, Table } from "@tanstack/react-table";
import React from "react";

type Props = {
    table: Table<any>,
}

export const Tbody: React.FC<Props> = (props) => {
    const { table } = props

    return (
        <tbody>
            {table.getRowModel().rows.map((row) => (
                <tr
                    key={row.id}
                >
                    {row.getVisibleCells().map((cell) => (
                        <td
                            key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}
