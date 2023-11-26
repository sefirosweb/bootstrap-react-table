import qs from 'qs'
import { useNavigate } from "react-router-dom";
import { PageOptions } from '../../../../src';
import React, { useEffect, useState } from 'react';

const INITIAL_PAGE_OPTIONS = (): PageOptions => {
    const params = qs.parse(window.location.search.slice(1)) as any

    const initialData: PageOptions = {
        page: 1,
        pageSize: 10,
        sorting: [],
        inputFilters: [],
        columnFilters: [],
        globalFilter: ''
    }

    if (!params) return initialData
    if (params.page) {
        params.page = parseInt(params.page)
    }
    if (params.pageSize) {
        params.pageSize = parseInt(params.pageSize)
    }
    if (params.sorting) {
        params.sorting = params.sorting.map(p => ({
            id: p.id,
            desc: p.desc === true || p.desc === 'true'
        }))
    }

    const newInitialData: PageOptions = {
        ...initialData,
        ...params
    }

    return newInitialData
}

export const useUrlPageParams = (url: string): [pageOptions: PageOptions, pageOptions: React.Dispatch<React.SetStateAction<PageOptions>>] => {
    const navigate = useNavigate()
    const [pageOptions, setPageOptions] = useState<PageOptions>(INITIAL_PAGE_OPTIONS())

    useEffect(() => {
        const parametros = qs.stringify(pageOptions);
        navigate(`${url}?${parametros}`);
    }, [pageOptions])

    return [pageOptions, setPageOptions]
}