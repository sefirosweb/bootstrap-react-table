import React from "react";
type Props = {
    pages: number;
    currentPage: number;
    totalRows: number;
    handleFirstPage: () => void;
    handlePrevPage: () => void;
    handleNextPage: () => void;
    handleLastPage: () => void;
    firstPageEnabled: boolean;
    prevPageEnabled: boolean;
    nextPageEnabled: boolean;
    lastPageEnabled: boolean;
    pageSize: number;
    setPageSize: (pageSize: number) => void;
    pageSizes: Array<number>;
};
export declare const Pagination: React.FC<Props>;
export {};
