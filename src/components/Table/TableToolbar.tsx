import React from "react"
import { Button, Col, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { flexRender } from "@tanstack/react-table"
import { CrudOptions } from "@/index"

type Props = {
    crudOptions: CrudOptions<any>
    createButtonFn: () => void
}

export const TableToolbar: React.FC<Props> = (props) => {
    const { create, customButtons } = props.crudOptions
    const { t } = useTranslation()

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
            {/* 
            <Col lg={6} md={6} xs={12} className="mb-3 align-self-end">
                <div className="d-flex justify-content-end">

                    {globalSearch && typeof enableGlobalFilterLabels === 'undefined' && (
                        <DebouncedInput
                            type="text"
                            value={filter}
                            onChange={(value) => setFilter(String(value))}
                            placeholder={t('Search') as string}
                            className="form-control"
                        />
                    )}

                    {globalSearch && enableGlobalFilterLabels && (
                        <div className="w-100">
                            <InputSearch
                                filters={filters}
                                setFilters={setFilters}
                                filterLabels={enableGlobalFilterLabels}
                            />
                        </div>
                    )}

                    {(canRefresh || canExport) && (
                        <div>
                            <ButtonGroup className="ms-2">
                                {canRefresh && (
                                    <RefreshButton
                                        disabled={isLoading}
                                        onClick={() => refreshTable()}
                                    />
                                )}

                                {canExport &&
                                    <Button onClick={() => generateExcel(exportName + Date.now())}>
                                        <FaFileExport size={18} />
                                    </Button>
                                }
                            </ButtonGroup>
                        </div>
                    )}

                </div>
            </Col> */}
        </Row>
    )
}