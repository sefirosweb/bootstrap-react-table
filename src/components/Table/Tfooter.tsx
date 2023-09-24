import React from "react";
import { Col, Form, Pagination, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    pages: number,
    currentPage: number,
    totalRows: number,

    handleFirstPage: () => void,
    handlePrevPage: () => void,
    handleNextPage: () => void,
    handleLastPage: () => void,

    firstPageEnabled: boolean,
    prevPageEnabled: boolean,
    nextPageEnabled: boolean,
    lastPageEnabled: boolean,

    pageSize: number,
    setPageSize: (pageSize: number) => void,
    pageSizes: Array<number>,
}

export const Tfooter: React.FC<Props> = (props) => {
    const { t } = useTranslation()

    return (
        <Row>
            <Col xs="auto" className="d-flex align-items-center">
                <Pagination style={{ marginBottom: 0 }}>
                    <Pagination.First
                        onClick={props.handleFirstPage}
                        disabled={props.firstPageEnabled}
                    />
                    <Pagination.Prev
                        onClick={props.handlePrevPage}
                        disabled={props.prevPageEnabled}
                    />
                    <Pagination.Item active>
                        {props.currentPage} {t('of')}{' '} {props.pages}
                    </Pagination.Item>
                    <Pagination.Next
                        onClick={props.handleNextPage}
                        disabled={props.nextPageEnabled}
                    />
                    <Pagination.Last
                        onClick={props.handleLastPage}
                        disabled={props.lastPageEnabled}
                    />
                </Pagination>
            </Col>
            <Col xs="auto" className="d-flex align-items-center">
                <Form.Select
                    value={props.pageSize}
                    onChange={(e) => {
                        const pageSize = parseInt(e.target.value);
                        if (isNaN(pageSize)) return;
                        props.setPageSize(pageSize);
                    }}
                >
                    {props.pageSizes.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {t('Show')} {pageSize}
                        </option>
                    ))}
                </Form.Select>
            </Col>
            <Col xs="auto" className="d-flex align-items-center">
                {t('Total rows')}: {props.totalRows}
            </Col>
        </Row>
    )
}
