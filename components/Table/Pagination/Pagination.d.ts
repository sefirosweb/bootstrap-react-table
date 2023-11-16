import React from "react";
type Props = {
    pages: number;
    currentPage: number;
    totalRows: number;
    handleFirstPage: () => void;
    handlePrevPage: () => void;
    handleNextPage: () => void;
    handleLastPage: () => void;
    firstPageDisabled: boolean;
    prevPageDisabled: boolean;
    nextPageDisabled: boolean;
    lastPageDisabled: boolean;
    pageSize: number;
    setPageSize: (pageSize: number) => void;
    pageSizes: Array<number>;
};
export declare const Pagination: React.FC<Props>;
export {};
