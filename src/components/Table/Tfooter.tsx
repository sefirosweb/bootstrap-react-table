import React from "react";
import { Col, Form, Pagination, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    pages: number,
    currentPage: number,
    setCurrentPage: (currentPage: number) => void,
    pageSize: number,
    setPageSize: (pageS: number) => void,
    pageSizes: Array<number>,
}

export const Tfooter: React.FC<Props> = (props) => {
    const { currentPage, setCurrentPage, pages, pageSize, pageSizes, setPageSize } = props
    const { t } = useTranslation()

    const prevPage = () => {
        setCurrentPage(currentPage - 1)
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    return (
        <Row>
            <Col xs="auto">
                <Pagination>
                    <Pagination.First
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage <= 1}
                    />
                    <Pagination.Prev
                        onClick={prevPage}
                        disabled={currentPage <= 1}
                    />
                    <Pagination.Item active>
                        {currentPage} {t('of')}{' '} {pages}
                    </Pagination.Item>
                    <Pagination.Next
                        onClick={nextPage}
                        disabled={currentPage >= pages}
                    />
                    <Pagination.Last
                        onClick={() => setCurrentPage(pages)}
                        disabled={currentPage >= pages}
                    />
                </Pagination>
            </Col>
            <Col xs="auto">
                <Form.Select
                    value={pageSize}
                    onChange={(e) => {
                        const pageS = parseInt(e.target.value);
                        if (isNaN(pageS)) return;
                        setPageSize(pageS);
                    }}
                >
                    {pageSizes.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {t('Show')} {pageSize}
                        </option>
                    ))}
                </Form.Select>
            </Col>
        </Row>
    )
}
