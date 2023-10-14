import { Meta, StoryObj } from '@storybook/react';
import { Table, TableProps } from '../../src';
import { useQueryOptionsEagle } from './tableProps';
import { GeneratedData } from '../../test/mock';

const meta: Meta = {
  title: 'Tables/Basic',
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
    },
    {
      accessorKey: 'description',
      header: 'Desc.',
    },
    {
      accessorKey: 'price',
      header: '€',
      enableSorting: true,
    }
  ],
  crudOptions: {
    primaryKey: 'uuid'
  },
  lazy: false
}

export const BasicTemplate: Story = {
  args: {
    tableProps: tableProps
  },
}
