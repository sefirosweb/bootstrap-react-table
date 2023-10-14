import React from "react";
import { UseQueryOptions } from "@tanstack/react-query";
import { ActionCrud, CrudOptions, QueryEagle, QueryPage, SelectOption, TableProps, TableRef } from "../../src";
import { GeneratedData, createData, deleteData, fakeData, getCategoriesFromUuids, getFetchAll, getFetchOptionsValue, getFetchPage, getRandom, updateData } from "../../test/mock";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { OptionsType, generateOptionsValue } from "../../test/mock/generateOptionsValue";
import { faker } from "@faker-js/faker";

const delay = 600

export const optionsCategory: UseQueryOptions<Array<SelectOption>> = {
    queryKey: ['optionsCategory'],
    queryFn: () => getFetchOptionsValue(delay)
}

export const useQueryOptionsLazy: UseQueryOptions<QueryPage<GeneratedData>> = {
    queryKey: ['useQueryOptionsLazy'],
    queryFn: (params) => getFetchPage(params, delay)
}

export const useQueryOptionsEagle: UseQueryOptions<QueryEagle<GeneratedData>> = {
    queryKey: ['useQueryOptionsEagle'],
    queryFn: (params) => getFetchAll(params, delay)
}


const categoryTable = (cell?: CellContext<GeneratedData, unknown>): TableProps<OptionsType> => {
    return {
        crudOptions: {
            primaryKey: 'uuid',
        },
        columns: [
            {
                accessorKey: 'uuid',
                header: 'Identificador',
            },
            {
                accessorKey: 'description',
                header: 'Desc.',
                meta: {
                    visible: false,
                }
            },
            {
                accessorKey: 'name',
                header: 'Nombre',
            },
        ],
        useQueryOptions: {
            // queryFn: () => getCategoriesFromUuids(cell.row.original.uuid, delay), // Get data from server
            queryFn: () => {
                if (!cell) {
                    return {
                        results: []
                    }
                }

                return {
                    results: cell.row.original.categories ?? []
                }
            },
        },
        lazy: false,
    }
}

export const columns: Array<ColumnDef<GeneratedData>> = [
    {
        accessorKey: 'uuid',
        header: 'UUID',
        meta: {
            visible: false,
            toggleShow: true,
        },
    },
    {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
        meta: {
            filterable: true,
            editable: true,
            toggleShow: true,
        },
    },
    {
        accessorKey: 'description',
        header: 'Desc.',
        meta: {
            editable: true,
        }
    },
    {
        accessorKey: 'price',
        header: '€',
        enableSorting: true,
        meta: {
            editable: true,
            filterable: true,
            type: 'number',
        },
    },
    {
        id: 'id_category',
        accessorKey: 'stock',
        header: 'Category',
        accessorFn: (row) => row.category?.uuid,
        cell: (props) => <div>{props.row.original.category?.name}</div>,
        meta: {
            filterable: true,
            editable: true,
            type: 'select',
            useQueryOptions: optionsCategory,
            addNullOption: true,
        },
    },
    {
        id: 'categories',
        header: 'Categories',
        cell: (props) => (
            <ul>
                {props.row.original.categories?.map((category, index) => (
                    <li key={index}>{category.name}</li>
                ))}
            </ul>
        ),
        meta: {
            toggleShow: true,
            editable: true,
            filterable: true,
            type: 'multiselect',
            useQueryOptions: optionsCategory,
            tableProps: (cell) => categoryTable(cell),
            multiSelectUnique: true
        },
    },
    {
        id: 'category',
        accessorFn: (row) => row.category?.name,
        meta: {
            visible: false,
        },
    },
    {
        id: 'created_at_date',
        accessorFn: (row) => DateTime.fromISO(row.created_at).toISODate(),
        header: () => <div>Created at date</div>,
        enableSorting: true,
        meta: {
            editable: false,
            filterable: true,
            type: 'date',
        }
    },
    {
        id: 'created_at',
        accessorFn: (row) => DateTime.fromISO(row.created_at).toISO(),
        cell: (props) => DateTime.fromISO(props.row.original.created_at).toLocaleString(DateTime.DATETIME_SHORT),
        enableSorting: true,
        meta: {
            editable: true,
            filterable: true,
            type: 'datetime',
        }
    }
];

export const crudOptions: CrudOptions<GeneratedData> = {
    primaryKey: 'uuid',
    create: true,
    edit: true,
    delete: true,
    canExport: true,
    canRefresh: true,
    globalSearch: true,
    pageSizes: [10, 25, 50, 100, 500, 1000, 5000, 10000],
    exportFilteredData: true,
    enableGlobalFilterLabels: [
        {
            filter: 'name',
            label: 'Name',
        },
        {
            filter: 'description',
            label: 'Descripction',
        },
        {
            filter: 'category',
            label: 'Category',
        },
        {
            filter: 'uuid',
            label: 'UUID',
        },
    ],
}

export const onSubmitFn = (data: Partial<any>, action: ActionCrud, tableRef: TableRef | null): Promise<Partial<any> | null> => {
    console.log('onSubmitFn-data', data)
    console.log('onSubmitFn-action', action)
    return new Promise((resolve, reject) => {
        tableRef?.setIsLoadingModal(true)

        const actionFn = () => {

            if (action === 'create') {
                const uuid = faker.string.uuid()
                const category = getRandom(generateOptionsValue())

                const newData = fakeData(uuid, category)
                return createData({ ...newData, ...data }, 230)
            }


            if (action === 'edit') {
                return updateData(data, 230)
            }

            if (action === 'delete') {
                if (!data.uuid) return Promise.reject('uuid is required')
                return deleteData(data.uuid, 230)
            }

            return Promise.reject('Action not found')
        }

        actionFn()
            .then(() => {
                tableRef?.setShowModal(false)
                tableRef?.refreshTable()
                resolve(data)
            })
            .finally(() => {
                tableRef?.setIsLoadingModal(false)
            })

    })
}

export const onSubmitFnWoRefresh = (data: Partial<GeneratedData>, action: ActionCrud, tableRef: TableRef | null): Promise<Partial<GeneratedData> | null> => {
    console.log('onSubmitFn-data', data)
    console.log('onSubmitFn-action', action)
    return new Promise((resolve, reject) => {
        tableRef?.setIsLoadingModal(true)

        const actionFn = () => {

            if (action === 'create') {
                const uuid = faker.string.uuid()
                const category = getRandom(generateOptionsValue())

                const newData = fakeData(uuid, category)
                return createData({ ...newData, ...data }, 230)
            }


            if (action === 'edit') {
                return updateData(data, 230)
            }

            if (action === 'delete') {
                if (!data.uuid) return Promise.reject('uuid is required')
                return deleteData(data.uuid, 230)
            }

            return Promise.reject('Action not found')
        }

        actionFn()
            .then((newData) => {
                tableRef?.setShowModal(false)
                resolve(newData)
            })
            .finally(() => {
                tableRef?.setIsLoadingModal(false)
            })

    })
}