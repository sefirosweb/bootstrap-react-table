import React from "react";
import { UseQueryOptions } from "@tanstack/react-query";
import { ActionCrud, CrudOptions, QueryEagle, QueryPage, SelectOption, TableRef } from "../../src";
import { GeneratedData, createData, deleteData, fakeData, generateRandomString, getFetchAll, getFetchOptionsValue, getFetchPage, getRandom, updateData } from "../../test/mock";
import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { generateOptionsValue } from "../../test/mock/generateOptionsValue";
import { faker } from "@faker-js/faker";

const delay = 800

export const optionsCategory: UseQueryOptions<Array<SelectOption>> = {
    queryKey: ['products'],
    queryFn: () => getFetchOptionsValue(delay)
}

export const useQueryOptionsLazy: UseQueryOptions<QueryPage<GeneratedData>> = {
    queryKey: ['products'],
    queryFn: (params) => getFetchPage(params, delay)
}

export const useQueryOptionsEagle: UseQueryOptions<QueryEagle<GeneratedData>> = {
    queryKey: ['products_all'],
    queryFn: (params) => getFetchAll(params, delay)
}

export const columns: Array<ColumnDef<GeneratedData>> = [
    {
        accessorKey: 'uuid',
        header: 'UUID',
        meta: {
            visible: true,
        },
    },
    {
        accessorKey: 'name',
        header: 'Name',
        meta: {
            filterable: true,
            editable: true,
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
        meta: {
            editable: true,
            filterable: true,
            type: 'number',
        },
    },
    {
        id: 'id_category',
        accessorFn: (row) => row.category?.uuid,
        cell: (props) => <div>{props.row.original.category.name}</div>,
        header: 'Category',
        meta: {
            filterable: true,
            editable: true,
            type: 'select',
            useQueryOptions: optionsCategory,
            addNullOption: true,
        },
    },
    {
        id: 'created_at',
        accessorFn: (row) => DateTime.fromISO(row.created_at).toMillis(),
        cell: (props) => DateTime.fromISO(props.row.original.created_at).toISODate(),
        meta: {
            editable: true,
            filterable: true,
            type: 'date',
        }
    },
    {
        id: 'created_at_time',
        accessorFn: (row) => DateTime.fromISO(row.created_at).toMillis(),
        cell: (props) => DateTime.fromISO(props.row.original.created_at).toFormat('yyyy-MM-dd HH:mm:ss'),
        meta: {
            editable: true,
            filterable: true,
            type: 'datetime',
        }
    }
];

export const crudOptions: CrudOptions<GeneratedData> = {
    id: 'table_stories',
    primaryKey: 'uuid',
    create: true,
    edit: true,
    delete: true,
    canExport: true,
    canRefresh: true,
    globalSearch: true,
    pageSizes: [10, 25, 50, 100, 500, 1000, 5000, 10000],
    delayFilter: delay,
    enableGlobalFilterLabels: [
        {
            filter: 'name',
            label: 'Name',
        },
        {
            filter: 'desc',
            label: 'Descripction',
        },
        {
            filter: 'category',
            label: 'Category',
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
                return createData({ ...newData, ...data }, 1500)
            }


            if (action === 'edit') {
                return updateData({
                    uuid: data.uuid,
                    name: data.name,
                    description: data.description,
                }, 1500)
            }

            if (action === 'delete') {
                if (!data.uuid) return Promise.reject('uuid is required')
                return deleteData(data.uuid, 1500)
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