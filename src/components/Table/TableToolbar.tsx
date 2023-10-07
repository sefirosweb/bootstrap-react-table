import React, { useContext, useEffect, useMemo, useState } from "react"
import { Button, ButtonGroup, Col, Dropdown, Form, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { Table, flexRender } from "@tanstack/react-table"
import InputSearch, { Filters } from "@sefirosweb/react-multiple-search"
import { FaColumns, FaFileExport } from "react-icons/fa"
import { RefreshButton } from "../buttons/RefreshButton"
import { DebouncedInput } from "./DebouncedInput"
import { TableContext } from "./TableContext"
import { exportToExcel } from "@/lib"

type Props = {
    table: Table<any>,
    createButtonFn: () => void
    setDynamicFilters: React.Dispatch<React.SetStateAction<Array<Filters>>>
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
}

export const TableToolbar: React.FC<Props> = (props) => {
    const { crudOptions, isFetching, refreshTable, tableData, isLazy, pageOptions, columns } = useContext(TableContext)
    const { t } = useTranslation()

    const [filter, setFilter] = useState("");
    const [filters, setFilters] = useState<Array<Filters>>([]);

    useEffect(() => {
        props.setDynamicFilters(filters);
    }, [filters]);

    useEffect(() => {
        props.setGlobalFilter(filter);
    }, [filter])

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

    const headersToggle = props.table.getHeaderGroups()
        .flatMap(headerGroup => headerGroup.headers)
        .filter(header => header.column.columnDef.meta?.toggleShow === true)

    return (
        <Row>
            <Col lg={6} md={6} xs={12} className="mb-3">
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

            <Col lg={6} md={6} xs={12} className="mb-3 align-self-end">
                <div className="d-flex justify-content-end">
                    {crudOptions.globalSearch && typeof crudOptions.enableGlobalFilterLabels === 'undefined' && (
                        <DebouncedInput
                            value={filter}
                            onChange={(value) => setFilter(value)}
                            placeholder={t('Search')}
                            className="form-control"
                            delayFilter={crudOptions.delayFilter ?? 230}
                        />
                    )}

                    {crudOptions.globalSearch && crudOptions.enableGlobalFilterLabels && (
                        <div className="w-100">
                            <InputSearch
                                filters={filters}
                                setFilters={setFilters}
                                filterLabels={crudOptions.enableGlobalFilterLabels}
                            />
                        </div>
                    )}

                    {(crudOptions.canRefresh || crudOptions.canExport || headersToggle.length > 0) && (
                        <div>
                            <ButtonGroup className="ms-2">
                                {crudOptions.canRefresh && (
                                    <RefreshButton
                                        disabled={isFetching}
                                        onClick={() => refreshTable()}
                                    />
                                )}

                                {crudOptions.canExport &&
                                    <Button
                                        disabled={isFetching}
                                        onClick={() => generateExcel(crudOptions.exportName ? crudOptions.exportName : "Export_" + Date.now())}>
                                        <FaFileExport size={18} />
                                    </Button>
                                }

                                {crudOptions.toggleShowColumns &&
                                    <Dropdown as={ButtonGroup}>
                                        <Dropdown.Toggle disabled={isFetching} >
                                            <FaColumns size={18} />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {headersToggle.map(header => (
                                                <Form.Check
                                                    className="mx-3"
                                                    type="checkbox"
                                                    id={header.id}
                                                    key={header.id}
                                                    name={header.id}
                                                    label={flexRender(header.column.columnDef.header, header.getContext())}
                                                />
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
    )
}