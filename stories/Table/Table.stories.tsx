import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../src';
import { UseQueryOptions } from '@tanstack/react-query';
import { CrudOptions, QueryEagle, QueryPage, SelectOption } from '../../src/types';
import { getFetchOptionsValue, getFetchPage, GeneratedData, getFetchAll } from '../../test/mock';
import { DateTime } from 'luxon';

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

const useQueryOptionsLazy: UseQueryOptions<QueryPage<GeneratedData>> = {
  queryKey: ['products'],
  queryFn: (params) => getFetchPage(params, delay)
}

const useQueryOptionsEagle: UseQueryOptions<QueryEagle<GeneratedData>> = {
  queryKey: ['products_all'],
  queryFn: (params) => getFetchAll(params, delay)
}

const crudOptions: CrudOptions<GeneratedData> = {
  id: 'table_stories',
  primaryKey: 'uuid',
  create: true,
  edit: true,
  delete: true,
  canExport: true,
  canRefresh: true,
  globalSearch: true,
  pageSizes: [10, 25, 50, 100, 500, 1000, 5000, 10000],
  delayFilter: 500,
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

  onSubmitFn: (data, action) => {
    console.log('onSubmitFn', data, action)
    return new Promise((resolve, reject) => {
      resolve(data)
    })
  },
}

const crudOptions2 = { ...crudOptions, enableGlobalFilterLabels: undefined }

export const LazyTemplate: Story = {
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsLazy,
      columns,
      crudOptions,
      lazy: true
    }
  },
}

export const LazyTemplateGlobal: Story = {
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsLazy,
      columns,
      crudOptions: crudOptions2,
      lazy: true
    }
  },
}

export const EagleTemplate: Story = {
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsEagle,
      columns,
      crudOptions,
      lazy: false
    }
  },
}

export const EagleTemplateGlobal: Story = {
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsEagle,
      columns,
      crudOptions: crudOptions2,
      lazy: false
    }
  },
}
