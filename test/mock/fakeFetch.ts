import { QueryFunctionContext } from "@tanstack/react-query";
import { QueryEagle, QueryPage, SelectOption, matchString } from "../../src";
import { GeneratedData, getData } from "./crudData";
import { OptionsType, generateOptionsValue } from "./generateOptionsValue";
import { inRangeDate, inRangeDateTime, inRangeNumber } from "../../src/lib";
import { DateTime } from "luxon";

export const getFetchOptionsValue = (delay = 30): Promise<Array<SelectOption>> => {
    return new Promise((resolve) => {
        console.log('fetching => getFetchOptionsValue => START')
        setTimeout(() => {
            const data = generateOptionsValue().map(p => ({
                ...p,
                label: p.name,
                value: p.uuid
            }))

            console.log('getFetchOptionsValue:', data)
            console.log('fetching => getFetchOptionsValue => DONE')
            resolve(data);
        }, delay)
    });
}

export const compareValue = (aVal: any, bVal: any, desc: boolean) => {
    if (aVal === bVal) {
        return null
    }

    if (DateTime.fromISO(aVal).isValid && DateTime.fromISO(bVal).isValid) {
        if (!desc) {
            return DateTime.fromISO(aVal).toMillis() - DateTime.fromISO(bVal).toMillis()
        }

        return DateTime.fromISO(bVal).toMillis() - DateTime.fromISO(aVal).toMillis()
    }

    if (typeof aVal === 'string' && typeof bVal === 'string') {
        if (!desc) {
            return aVal.localeCompare(bVal)
        }

        return bVal.localeCompare(aVal)
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
        if (!desc) {
            return aVal - bVal
        }

        return bVal - aVal
    }

    if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
        if (!desc) {
            return aVal ? -1 : 1
        }

        return bVal ? -1 : 1
    }

    return null
}

export const getFetchPage = (params: QueryFunctionContext, delay = 30): Promise<QueryPage<GeneratedData>> => {
    return new Promise((resolve) => {
        let data = getData()

        const currentPage = params.meta?.page ?? 1
        const pageSize = params.meta?.pageSize ?? 10
        const sorting = params.meta?.sorting ?? []

        const start = currentPage * pageSize - pageSize;
        const end = start + pageSize;

        const filters: Array<Record<string, any>> = []
        if (params.meta?.globalFilter) {
            filters.push({
                filter: 'globalFilter',
                text: params.meta.globalFilter
            })
        }

        if (params.meta?.columnFilters) {
            params.meta.columnFilters.forEach(p => {
                filters.push({
                    filter: p.id,
                    text: p.value
                })
            })
        }

        if (params.meta?.inputFilters) {
            params.meta.inputFilters.forEach(p => {
                filters.push({
                    filter: p.filter,
                    text: p.text
                })
            })
        }

        filters.forEach(p => {
            data = data.filter(d => {
                if (p.filter === 'id_category' && d.category) {
                    return matchString(d.category.uuid, p.text)
                }

                if (p.filter === 'name') {
                    return matchString(d.name, p.text)
                }

                if (p.filter === 'created_at_date') {
                    const min = p.text[0] ? DateTime.fromISO(p.text[0]) : null
                    const max = p.text[1] ? DateTime.fromISO(p.text[1]) : null
                    return inRangeDate(DateTime.fromISO(d.created_at).toMillis(), min?.toMillis(), max?.toMillis())
                }

                if (p.filter === 'created_at') {
                    const min = p.text[0] ? DateTime.fromISO(p.text[0]) : null
                    const max = p.text[1] ? DateTime.fromISO(p.text[1]) : null
                    return inRangeDateTime(DateTime.fromISO(d.created_at).toMillis(), min?.toMillis(), max?.toMillis())
                }


                if (p.filter === 'price') {
                    return inRangeNumber(d.price, p.text[0], p.text[1])
                }

                if (p.filter === 'description') {
                    return matchString(d.description, p.text)
                }

                if (p.filter === 'uuid') {
                    return matchString(d.uuid, p.text)
                }

                if (p.filter === 'category' && d.category) {
                    return matchString(d.category.name, p.text)
                }

                if (p.filter === 'globalFilter') {
                    return matchString(d.name, p.text) || matchString(d.category?.name ?? '', p.text) || matchString(d.description, p.text) || matchString(d.uuid, p.text)
                }
            })
        })

        data.sort((a, b) => {
            for (let i = 0; i < sorting.length; i++) {
                const sort = sorting[i]
                const aVal = a[sort.id]
                const bVal = b[sort.id]

                const resSort = compareValue(aVal, bVal, sort.desc)
                if (resSort !== null) {
                    return resSort
                }
            }

            return 0;
        });

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
        const data = getData()

        setTimeout(() => {
            const response: QueryEagle<GeneratedData> = {
                results: data,
            };


            resolve(response);
        }, delay);
    });
}

export const getCategoriesFromUuids = (uuid: string, delay = 30): Promise<QueryEagle<OptionsType>> => {
    return new Promise((resolve) => {
        const data = getData()
        const dataFiltered = data.find(p => p.uuid === uuid)

        setTimeout(() => {
            if (!dataFiltered) return resolve({
                results: []
            })

            resolve({
                results: dataFiltered.categories ?? []
            });
        }, delay);
    })
}