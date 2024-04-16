import React, { useEffect, useRef } from "react";
import { Form, Pagination as BPagination } from "react-bootstrap";
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

    const currentPageRef = useRef<HTMLDivElement>(null);
    const pagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!currentPageRef.current || !pagesRef.current) return;
        console.log('props.pages')
        const pagesWidth = pagesRef.current.offsetWidth;
        currentPageRef.current.style.width = `${pagesWidth}px`;
    }, [props.pages]);


    return (
        <div className="d-flex gap-1 justify-content-between ">
            <div className="d-flex align-items-center">
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
                        <div className="d-flex gap-1">
                            <div className="text-center" ref={currentPageRef}>
                                {props.currentPage}
                            </div>
                            <div>
                                {t('of')}
                            </div>
                            <div className="text-center" ref={pagesRef}>
                                {props.pages}
                            </div>
                        </div>
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
            </div>
            <div className="d-flex align-items-center">
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
            </div>
            <div className="d-flex align-items-center">
                {t('total_rows', { rows: props.totalRows })}
            </div>
        </div>
    )
}
