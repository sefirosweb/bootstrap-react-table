import React, { useContext } from "react"
import { Button, ButtonGroup, Col, Dropdown, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { Table, flexRender } from "@tanstack/react-table"
import InputSearch, { Filters } from "@sefirosweb/react-multiple-search"
import { FaColumns, FaFileExport } from "react-icons/fa"
import { RefreshButton } from "../../buttons/RefreshButton"
import { DebouncedInput } from "../DebouncedInput"
import { TableContext } from "../TableContext"
import { exportToExcel } from "@/lib"
import { Togle } from "./Togle"
import { Pagination } from "../Pagination"

type Props = {
    table: Table<any>,
    createButtonFn: () => void
}

export const TableToolbar: React.FC<Props> = (props) => {
    const tableContext = useContext(TableContext)
    const { t } = useTranslation()

    const globalFilter = tableContext.pageOptions.globalFilter ?? ''
    const setGlobalFilter = (newVal: string) => {
        const newPageOptions = { ...tableContext.pageOptions, globalFilter: newVal }
        newPageOptions.page = 1
        tableContext.setPageOptions(newPageOptions)
    }

    const inputFilters = tableContext.pageOptions.inputFilters ?? []
    const setInputFilters = (newVal: Array<Filters>) => {
        const newPageOptions = { ...tableContext.pageOptions, inputFilters: newVal }
        newPageOptions.page = 1
        tableContext.setPageOptions(newPageOptions)
    }

    const generateExcel = (fileName: string) => {
        if (tableContext.isLazy) {
            if (tableContext.crudOptions.exportFn) {
                return tableContext.crudOptions.exportFn({
                    table: props.table,
                    tableData: tableContext.tableData,
                    pageOptions: tableContext.pageOptions
                })
            }
            return console.error("exportFn is required when isLazy is true")
        }

        if (tableContext.crudOptions.exportFn) {
            tableContext.crudOptions.exportFn({
                table: props.table,
                tableData: tableContext.tableData,
            })
        } else {

            const data: Array<Record<string, any>> = []

            const rows = tableContext.crudOptions.exportFilteredData ?
                props.table.getFilteredRowModel().rows :
                props.table.getCoreRowModel().rows

            rows.forEach(row => {
                const tempRowData: Record<string, any> = {}
                row.getAllCells()
                    .filter(cell => cell.column.columnDef.meta?.exportable !== false)
                    .forEach((cell) => {
                        tempRowData[cell.column.id] = cell.getValue()
                    })
                data.push(tempRowData)
            })

            exportToExcel(data, fileName)
        }
    }

    const toggleColumns = props.table.getAllLeafColumns()
        .filter(column => column.columnDef.meta?.toggleShow === true)

    return (
        <Row>
            <Col lg={6} md={6} xs={12} className="mb-1">
                {tableContext.crudOptions.create && (
                    <>
                        {tableContext.crudOptions.createButton ?
                            flexRender(tableContext.crudOptions.createButton, { onClick: props.createButtonFn }) :
                            <Button variant="success" onClick={props.createButtonFn}>
                                {t('Create')}
                            </Button>
                        }
                    </>
                )}

                {tableContext.crudOptions.customButtons}
            </Col>

            <Col lg={6} md={6} xs={12} className="mb-1 align-self-end">

                <div className="d-flex justify-content-end">
                    {tableContext.crudOptions.globalSearch && typeof tableContext.crudOptions.enableGlobalFilterLabels === 'undefined' && (
                        <DebouncedInput
                            size="sm"
                            value={globalFilter}
                            onChange={(value) => setGlobalFilter(value)}
                            placeholder={t('Search')}
                            className="form-control mb-1"
                            delayFilter={tableContext.crudOptions.delayFilter ?? 230}
                        />
                    )}

                    {tableContext.crudOptions.globalSearch && tableContext.crudOptions.enableGlobalFilterLabels && (
                        <div className="w-100 mb-1">
                            <InputSearch
                                filters={inputFilters}
                                setFilters={setInputFilters}
                                filterLabels={tableContext.crudOptions.enableGlobalFilterLabels}
                            />
                        </div>
                    )}

                    {(tableContext.crudOptions.canRefresh || tableContext.crudOptions.canExport || tableContext.crudOptions.toggleShowColumns) && (
                        <div>
                            <ButtonGroup className="ms-2">
                                {tableContext.crudOptions.canRefresh && (
                                    <RefreshButton
                                        size="sm"
                                        disabled={tableContext.isFetching}
                                        onClick={() => tableContext.refreshTable()}
                                    />
                                )}

                                {tableContext.crudOptions.canExport &&
                                    <Button
                                        className='d-flex justify-content-center align-items-center p-2'
                                        size='sm'
                                        disabled={tableContext.isFetching}
                                        onClick={() => generateExcel(tableContext.crudOptions.exportName ? tableContext.crudOptions.exportName : "Export_" + Date.now())}>
                                        <FaFileExport />
                                    </Button>
                                }

                                {tableContext.crudOptions.toggleShowColumns &&
                                    <Dropdown as={ButtonGroup} >
                                        <Dropdown.Toggle disabled={tableContext.isFetching} className='d-flex justify-content-center align-items-center p-2' size="sm" >
                                            <FaColumns />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {toggleColumns.map(column => (
                                                <Togle column={column} key={column.id} />
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }

                            </ButtonGroup>
                        </div>
                    )}
                </div>

                {tableContext.crudOptions.pagination !== false &&
                    <Pagination table={props.table} />
                }

            </Col>
        </Row>
    )
}