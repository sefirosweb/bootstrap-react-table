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

    firstPageDisabled: boolean,
    prevPageDisabled: boolean,
    nextPageDisabled: boolean,
    lastPageDisabled: boolean,

    pageSize: number,
    setPageSize: (pageSize: number) => void,
    pageSizes: Array<number>,
}

export const Pagination: React.FC<Props> = (props) => {
    const { t } = useTranslation()

    return (
        <Row>
            <Col xs="auto" className="d-flex align-items-center">
                <BPagination style={{ marginBottom: 0 }} size="sm">
                    <BPagination.First
                        onClick={props.handleFirstPage}
                        disabled={props.firstPageDisabled}
                    />
                    <BPagination.Prev
                        onClick={props.handlePrevPage}
                        disabled={props.prevPageDisabled}
                    />
                    <BPagination.Item active>
                        {props.currentPage} {t('of')}{' '} {props.pages}
                    </BPagination.Item>
                    <BPagination.Next
                        onClick={props.handleNextPage}
                        disabled={props.nextPageDisabled}
                    />
                    <BPagination.Last
                        onClick={props.handleLastPage}
                        disabled={props.lastPageDisabled}
                    />
                </BPagination>
            </Col>
            <Col xs="auto" className="d-flex align-items-center">
                <Form.Select
                    size="sm"
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
