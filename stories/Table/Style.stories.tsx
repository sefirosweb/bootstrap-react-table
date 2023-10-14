import { Meta, StoryObj } from '@storybook/react';
import { Table, TableProps } from '../../src';
import { useQueryOptionsEagle } from './tableProps';
import { GeneratedData } from '../../test/mock';

const meta: Meta = {
  title: 'Tables/Style',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

const tableProps: TableProps<GeneratedData> = {
  useQueryOptions: useQueryOptionsEagle,

  columns: [
    {
      accessorKey: 'uuid',
      header: 'UUID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
      enableSorting: true,
      meta: {
        getCellStyle: (cell) => {
          return {
            color: cell.row.original.price > 100 ? 'red' : 'green'
          }
        },
      }
    },
    {
      accessorKey: 'description',
      header: 'Desc.',
    },
    {
      accessorKey: 'price',
      header: '€',
      enableSorting: true,
      meta: {
        getCellClass: (cell) => {
          if (cell.row.original.price > 100) {
            return 'text-warning'
          }

          return 'text-white'
        }
      }
    }
  ],

  crudOptions: {
    primaryKey: 'uuid',
    getRowStyles: (row) => {
      return {
        backgroundColor: row.original.price > 100 ? 'red' : 'green'
      }
    },
    getRowClass: (row) => {
      return row.original.price > 100 ? 'table-danger' : 'table-success'
    },
  },

  lazy: false
}

export const CustomStyle: Story = {
  args: {
    tableProps: tableProps
  },
}
