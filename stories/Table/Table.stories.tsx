import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../src';
import { UseQueryOptions } from '@tanstack/react-query';
import { CrudOptions, QueryPage, SelectOption } from '../../src/types';
import { getFetchOptionsValue, getFetchPage, GeneratedData } from '../../test/mock';

const meta: Meta = {
  title: 'Tables/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

const delay = 1500

const optionsCategory: UseQueryOptions<Array<SelectOption>> = {
  queryKey: ['products'],
  queryFn: () => getFetchOptionsValue(delay)
}

const columns: Array<ColumnDef<GeneratedData>> = [
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
    accessorKey: 'createdAt',
    meta: {
      editable: true,
      filterable: true,
      type: 'datetime',
    }
  }
];

const useQueryOptions: UseQueryOptions<QueryPage<GeneratedData>> = {
  queryKey: ['products'],
  queryFn: (params) => getFetchPage(params, delay)
}

const crudOptions: CrudOptions<GeneratedData> = {
  id: 'table_stories',
  primaryKey: 'uuid',
  create: true,
  edit: true,
  delete: true,
  onSubmitFn: (data, action) => {
    console.log('onSubmitFn', data, action)
    return new Promise((resolve, reject) => {
      resolve(data)
    })
  },
  // editFn: (action) => {
  //   console.log('asd')
  //   action()
  // },

  // createButton: (props) => <button onClick={props.onClick}>Create</button>,
  // createFn: (action) => {
  //   console.log('asd')
  //   action()
  // },

  // editButton: (props) => <div onClick={props.onClick}>{props.cell.row.original.uuid}</div>,
  // deleteButton: (props) => <div onClick={props.onClick}>{props.cell.row.original.uuid}</div>,
}

export const Template: Story = {
  args: {
    columns,
    useQueryOptions,
    crudOptions,
  },
}