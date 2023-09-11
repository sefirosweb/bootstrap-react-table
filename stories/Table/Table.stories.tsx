import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ColumnDef } from '@tanstack/react-table';
import { data } from '../../test/mock/Product';
import { Table } from '../../src';
import { UseQueryOptions } from '@tanstack/react-query';
import { CrudOptions, QueryPage } from '../../src/types';
import { GeneratedData } from '../../test/mock/crudData';

const meta: Meta = {
  title: 'Tables/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

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
    header: 'Category',
    meta: {
      filterable: true,
      type: 'select',
      useQueryOptions: {
        queryKey: ['categories'],
        queryFn: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                {
                  value: '',
                  label: '',
                },
                {
                  value: '1',
                  label: 'Category 1',
                  otherValue: '5'
                },
                {
                  value: '2',
                  label: 'Category 2',
                  asd: '5'
                },
                {
                  value: '3',
                  label: 'Category 3',
                  asd: 'Category 3',
                },
              ]);
            }, 400);
          });
        }
      }
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
    accessorKey: 'category',
    header: 'Cat.',
    meta: {
      editable: true,
      filterable: true,
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
  queryFn: (params) => {
    return new Promise((resolve) => {
      const currentPage = params.meta?.page ?? 1
      const pageSize = params.meta?.pageSize ?? 10

      const start = currentPage * pageSize - pageSize;
      const end = start + pageSize;

      const newData = data.slice(start, end);
      const totalPages = Math.ceil(data.length / pageSize);

      console.log('params', newData)
      console.log('params', totalPages)

      setTimeout(() => {
        resolve({
          results: newData,
          nextCursor: currentPage < totalPages ? currentPage + 1 : null,
          pages: totalPages,
          prevCursor: currentPage > 1 ? currentPage - 1 : null,
        });
      }, 400);
    });
  },
}

const crudOptions: CrudOptions<GeneratedData> = {
  id: 'table_stories',
  primaryKey: 'uuid',
  create: true,
  edit: true,
  delete: true,
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