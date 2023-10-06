import React, { useContext, useEffect, useState } from "react"
import { Button, ButtonGroup, Col, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { flexRender } from "@tanstack/react-table"
import InputSearch, { Filters } from "@sefirosweb/react-multiple-search"
import { FaFileExport } from "react-icons/fa"
import { RefreshButton } from "../buttons/RefreshButton"
import { DebouncedInput } from "./DebouncedInput"
import { TableContext } from "./TableContext"

type Props = {
    createButtonFn: () => void
    setDynamicFilters: React.Dispatch<React.SetStateAction<Array<Filters>>>
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
}

export const TableToolbar: React.FC<Props> = (props) => {
    const { crudOptions, isFetching, refreshTable } = useContext(TableContext)
    const { t } = useTranslation()

    const [filter, setFilter] = useState("");
    const [filters, setFilters] = useState<Array<Filters>>([]);

    useEffect(() => {
        props.setDynamicFilters(filters);
    }, [filters]);

    useEffect(() => {
        props.setGlobalFilter(filter);
    }, [filter])

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

                    {(crudOptions.canRefresh || crudOptions.canExport) && (
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
                                        // onClick={() => generateExcel(exportName + Date.now())}
                                        disabled={isFetching}
                                    >
                                        <FaFileExport size={18} />
                                    </Button>
                                }
                            </ButtonGroup>
                        </div>
                    )}

                </div>
            </Col>
        </Row>
    )
}