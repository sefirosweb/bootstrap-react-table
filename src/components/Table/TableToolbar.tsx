import React, { useEffect, useState } from "react"
import { Button, ButtonGroup, Col, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { flexRender } from "@tanstack/react-table"
import { CrudOptions } from "@/index"
import InputSearch, { Filters } from "@sefirosweb/react-multiple-search"
import { FaFileExport } from "react-icons/fa"
import { RefreshButton } from "../buttons/RefreshButton"
import { DebouncedInput } from "./DebouncedInput"

type Props = {
    crudOptions: CrudOptions<any>
    createButtonFn: () => void
    setDynamicFilters: React.Dispatch<React.SetStateAction<Array<Filters>>>
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
    refreshTable: () => void,
    isLoading: boolean,
}

export const TableToolbar: React.FC<Props> = (props) => {
    const { create, customButtons } = props.crudOptions
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
                {create && (
                    <>
                        {props.crudOptions.createButton ?
                            flexRender(props.crudOptions.createButton, { onClick: props.createButtonFn }) :
                            <Button variant="success" onClick={props.createButtonFn}>
                                {t('Create')}
                            </Button>
                        }
                    </>
                )}

                {customButtons}
            </Col>

            <Col lg={6} md={6} xs={12} className="mb-3 align-self-end">
                <div className="d-flex justify-content-end">
                    {props.crudOptions.globalSearch && typeof props.crudOptions.enableGlobalFilterLabels === 'undefined' && (
                        <DebouncedInput
                            value={filter}
                            onChange={(value) => setFilter(value)}
                            placeholder={t('Search')}
                            className="form-control"
                            delayFilter={props.crudOptions.delayFilter ?? 230}
                        />
                    )}

                    {props.crudOptions.globalSearch && props.crudOptions.enableGlobalFilterLabels && (
                        <div className="w-100">
                            <InputSearch
                                filters={filters}
                                setFilters={setFilters}
                                filterLabels={props.crudOptions.enableGlobalFilterLabels}
                            />
                        </div>
                    )}

                    {(props.crudOptions.canRefresh || props.crudOptions.canExport) && (
                        <div>
                            <ButtonGroup className="ms-2">
                                {props.crudOptions.canRefresh && (
                                    <RefreshButton
                                        disabled={props.isLoading}
                                        onClick={() => props.refreshTable()}
                                    />
                                )}

                                {props.crudOptions.canExport &&
                                    <Button
                                        // onClick={() => generateExcel(exportName + Date.now())}
                                        disabled={props.isLoading}
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