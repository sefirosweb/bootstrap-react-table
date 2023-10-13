import React from "react";
import { Col, Form, Pagination as BPagination, Row } from "react-bootstrap";
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

export const Pagination: React.FC<Props> = (props) => {
    const { t } = useTranslation()

    return (
        <Row>
            <Col xs="auto" className="d-flex align-items-center">
                <BPagination style={{ marginBottom: 0 }}>
                    <BPagination.First
                        onClick={props.handleFirstPage}
                        disabled={props.firstPageEnabled}
                    />
                    <BPagination.Prev
                        onClick={props.handlePrevPage}
                        disabled={props.prevPageEnabled}
                    />
                    <BPagination.Item active>
                        {props.currentPage} {t('of')}{' '} {props.pages}
                    </BPagination.Item>
                    <BPagination.Next
                        onClick={props.handleNextPage}
                        disabled={props.nextPageEnabled}
                    />
                    <BPagination.Last
                        onClick={props.handleLastPage}
                        disabled={props.lastPageEnabled}
                    />
                </BPagination>
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
                {t('total_rows', { rows: props.totalRows })}
            </Col>
        </Row>
    )
}
