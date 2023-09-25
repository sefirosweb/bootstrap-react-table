import { QueryFunctionContext } from "@tanstack/react-query";
import { QueryEagle, QueryPage, SelectOption, matchString } from "../../src";
import { GeneratedData, getData } from "./crudData";
import { generateOptionsValue } from "./generateOptionsValue";
import { inRangeDate, inRangeDateTime, inRangeNumber } from "../../src/lib";
import { DateTime } from "luxon";

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
        let data = getData({
            minValue: 10000,
            maxValue: 50000
        })

        const currentPage = params.meta?.page ?? 1
        const pageSize = params.meta?.pageSize ?? 10

        const start = currentPage * pageSize - pageSize;
        const end = start + pageSize;

        params.meta?.filters?.forEach(p => {
            data = data.filter(d => {
                if (p.filter === 'id_category') {
                    return matchString(d.category.uuid, p.text)
                }

                if (p.filter === 'name') {
                    return matchString(d.name, p.text)
                }

                if (p.filter === 'created_at') {
                    return inRangeDate(DateTime.fromISO(d.created_at).toMillis(), p.text.min, p.text.max)
                }

                if (p.filter === 'created_at_time') {
                    return inRangeDateTime(DateTime.fromISO(d.created_at).toMillis(), p.text.min, p.text.max)
                }

                if (p.filter === 'price') {
                    return inRangeNumber(d.price, p.text.min, p.text.max)
                }

                if (p.filter === 'desc') {
                    return matchString(d.description, p.text)
                }

                if (p.filter === 'category') {
                    return matchString(d.category.name, p.text)
                }

                if (p.filter === 'globalFilter') {
                    return matchString(d.name, p.text) || matchString(d.category.name, p.text) || matchString(d.description, p.text) || matchString(d.uuid, p.text)
                }
            })
        })

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

export const getFetchAll = (params: QueryFunctionContext, delay = 30): Promise<QueryEagle<GeneratedData>> => {
    return new Promise((resolve) => {
        const data = getData(
            {
                minValue: 100,
                maxValue: 200
            }
        )
        setTimeout(() => {
            const response: QueryEagle<GeneratedData> = {
                results: data,
            };


            resolve(response);
        }, delay);
    });
}