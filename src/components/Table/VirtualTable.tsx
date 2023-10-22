import { Row, Table, flexRender } from "@tanstack/react-table";
import React, { useContext, useMemo, useRef } from "react";
import { Table as BTable } from "react-bootstrap";
import { useVirtualizer } from '@tanstack/react-virtual';
import { Thead } from "./Thead";
import { TableContext } from "./TableContext";
import { LoaderBar, LoaderDiv, LoaderTD } from "./style";

type Props = {
    table: Table<any>
}

export const VirtualTable: React.FC<Props> = ({ table }) => {
    const { isFetching, crudOptions } = useContext(TableContext)

    const { rows } = table.getRowModel()
    const parentRef = useRef(null);

    const virtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => crudOptions.virtualRows?.height ?? 100,
        overscan: 5,
    });

    const TrLoading = useMemo(() => {
        const TrLoading: React.FC<{}> = () => (
            <tr style={{ position: 'fixed' }}>
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
        <>
            <div ref={parentRef}
                style={{
                    height: `100%`,
                    overflow: 'auto',
                }}
            >
                <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
                    <BTable
                        hover
                        bordered
                        style={{
                            display: 'grid'
                        }}
                    >

                        <Thead table={table}
                            style={{
                                display: 'grid',
                                position: 'sticky',
                                top: 0,
                                zIndex: 2,
                            }}
                            trStyle={{
                                display: 'flex',
                            }}

                            thStyle={{
                                width: 100 / (table.getFlatHeaders()?.length ?? 100) + '%',
                            }}
                        />

                        <tbody style={{
                            display: 'grid'
                        }}>
                            <TrLoading />

                            {virtualizer.getVirtualItems().map((virtualRow, index) => {
                                const row = rows[virtualRow.index] as Row<any>
                                const width = 100 / (row.getVisibleCells()?.length ?? 100)

                                return (
                                    <tr
                                        key={row.id}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            height: `${virtualRow.size}px`,
                                            transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                                        }}
                                        className={crudOptions.getRowClass ? crudOptions.getRowClass(row) : ''}
                                    >
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td
                                                    style={{
                                                        width: `${width}%`,
                                                    }}
                                                    // style={cell.column.columnDef.meta?.getCellStyle ? cell.column.columnDef.meta?.getCellStyle(cell.getContext()) : undefined}
                                                    className={cell.column.columnDef.meta?.getCellClass ? cell.column.columnDef.meta?.getCellClass(cell.getContext()) : undefined}
                                                    key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>

                    </BTable>
                </div>
            </div>
        </>
    )
}