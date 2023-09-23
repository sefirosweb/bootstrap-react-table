import { QueryFunctionContext } from "@tanstack/react-query";
import { QueryPage, SelectOption } from "../../src";
import { GeneratedData, getData } from "./crudData";
import { generateOptionsValue } from "./generateOptionsValue";

export const getFetchOptionsValue = (delay = 30): Promise<Array<SelectOption>> => {
    return new Promise((resolve) => {
        console.log('fetching => getFetchOptionsValue')
        setTimeout(() => {
            const data = generateOptionsValue().map(p => ({
                ...p,
                label: p.name,
                value: p.uuid
            }))

            console.log('getFetchOptionsValue:', data)
            console.log('fetching => getFetchOptionsValue => done')
            resolve(data);
        }, delay)
    });
}

export const getFetchPage = (params: QueryFunctionContext, delay = 30): Promise<QueryPage<GeneratedData>> => {
    return new Promise((resolve) => {
        const data = getData()

        const currentPage = params.meta?.page ?? 1
        const pageSize = params.meta?.pageSize ?? 10

        const start = currentPage * pageSize - pageSize;
        const end = start + pageSize;

        const newData = data.slice(start, end);
        const totalPages = Math.ceil(data.length / pageSize);

        console.log('params', params.meta)

        setTimeout(() => {
            const response: QueryPage<GeneratedData> = {
                results: newData,
                nextCursor: currentPage < totalPages ? currentPage + 1 : null,
                pages: totalPages,
                prevCursor: currentPage > 1 ? currentPage - 1 : null,
                currentPage: currentPage,
                totalRows: data.length,
            };


            resolve(response);
        }, delay);
    });
}