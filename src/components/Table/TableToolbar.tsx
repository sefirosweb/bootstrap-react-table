import React, { useContext } from "react"
import { Button, ButtonGroup, Col, Dropdown, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { Table, flexRender } from "@tanstack/react-table"
import InputSearch, { Filters } from "@sefirosweb/react-multiple-search"
import { FaColumns, FaFileExport } from "react-icons/fa"
import { RefreshButton } from "../buttons/RefreshButton"
import { DebouncedInput } from "./DebouncedInput"
import { TableContext } from "./TableContext"
import { exportToExcel } from "@/lib"
import { Togle } from "./TableToolbar/Togle"
import { Pagination } from "./Pagination"

type Props = {
    table: Table<any>,
    createButtonFn: () => void
}

export const TableToolbar: React.FC<Props> = (props) => {
    const { crudOptions, isFetching, refreshTable, tableData, isLazy, pageOptions, setPageOptions } = useContext(TableContext)
    const { t } = useTranslation()

    const globalFilter = pageOptions.globalFilter ?? ''
    const setGlobalFilter = (newVal: string) => {
        const newPageOptions = { ...pageOptions, globalFilter: newVal }
        if (isLazy) {
            newPageOptions.page = 1
        }

        setPageOptions(newPageOptions)
    }

    const inputFilters = pageOptions.inputFilters ?? []
    const setInputFilters = (newVal: Array<Filters>) => {
        const newPageOptions = { ...pageOptions, inputFilters: newVal }
        if (isLazy) {
            newPageOptions.page = 1
        }

        setPageOptions(newPageOptions)
    }

    const generateExcel = (fileName: string) => {
        if (isLazy) {
            if (crudOptions.exportFn) {
                return crudOptions.exportFn({
                    table: props.table,
                    tableData,
                    pageOptions
                })
            }
            return console.error("exportFn is required when isLazy is true")
        }

        if (crudOptions.exportFn) {
            crudOptions.exportFn({
                table: props.table,
                tableData
            })
        } else {

            const data: Array<Record<string, any>> = []

            const rows = crudOptions.exportFilteredData ?
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
                {crudOptions.create && (
                    <>
                        {crudOptions.createButton ?
                            flexRender(crudOptions.createButton, { onClick: props.createButtonFn }) :
                            <Button variant="success" onClick={props.createButtonFn}>
                                {t('Create')}
                            </Button>
                        }
                    </>
                )}

                {crudOptions.customButtons}
            </Col>

            <Col lg={6} md={6} xs={12} className="mb-1 align-self-end">
                <Row>
                    <Col>
                        <div className="d-flex justify-content-end">
                            {crudOptions.globalSearch && typeof crudOptions.enableGlobalFilterLabels === 'undefined' && (
                                <DebouncedInput
                                    size="sm"
                                    value={globalFilter}
                                    onChange={(value) => setGlobalFilter(value)}
                                    placeholder={t('Search')}
                                    className="form-control mb-1"
                                    delayFilter={crudOptions.delayFilter ?? 230}
                                />
                            )}

                            {crudOptions.globalSearch && crudOptions.enableGlobalFilterLabels && (
                                <div className="w-100 mb-1">
                                    <InputSearch
                                        filters={inputFilters}
                                        setFilters={setInputFilters}
                                        filterLabels={crudOptions.enableGlobalFilterLabels}
                                    />
                                </div>
                            )}

                            {(crudOptions.canRefresh || crudOptions.canExport || crudOptions.toggleShowColumns) && (
                                <div>
                                    <ButtonGroup className="ms-2">
                                        {crudOptions.canRefresh && (
                                            <RefreshButton
                                                size="sm"
                                                disabled={isFetching}
                                                onClick={() => refreshTable()}
                                            />
                                        )}

                                        {crudOptions.canExport &&
                                            <Button
                                                className='d-flex justify-content-center align-items-center p-2'
                                                size='sm'
                                                disabled={isFetching}
                                                onClick={() => generateExcel(crudOptions.exportName ? crudOptions.exportName : "Export_" + Date.now())}>
                                                <FaFileExport />
                                            </Button>
                                        }

                                        {crudOptions.toggleShowColumns &&
                                            <Dropdown as={ButtonGroup} >
                                                <Dropdown.Toggle disabled={isFetching} className='d-flex justify-content-center align-items-center p-2' size="sm" >
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
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Pagination table={props.table} />
                    </Col>
                </Row>

            </Col>
        </Row>
    )
}