import { flexRender, Table } from "@tanstack/react-table";
import React from "react";

type Props = {
    table: Table<any>,
}

export const Tbody: React.FC<Props> = (props) => {
    return (
        <tbody>
            {props.table.getRowModel().rows.map((row) => (
                <tr
                    key={row.id}
                >
                    {row.getVisibleCells().filter(row => row.column.columnDef.meta?.visible !== false).map((cell) => (
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
