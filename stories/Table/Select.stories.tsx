import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Table, TableProps, TableRef } from '../../src';
import { useQueryOptionsEagle } from './tableProps';
import { GeneratedData } from '../../test/mock';
import { useRef } from 'react';
import { Button } from 'react-bootstrap';

const meta: Meta = {
  title: 'Tables/Select',
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
        filterable: true,
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
    }
  ],
  crudOptions: {
    primaryKey: 'uuid',
    canSelectRow: true,
    canRefresh: true,
  },
  lazy: false
}

export const SelectRowTemplate: Story = {
  render: () => {
    const tableRef = useRef<TableRef>(null)
    const [selectedRows, setSelectedRows] = React.useState<Array<any>>([])

    const handleClick = () => {
      if (!tableRef.current) {
        return
      }

      setSelectedRows(
        tableRef.current.getSelectedRows<GeneratedData>()
          .map(row => ({
            uuid: row.uuid,
            name: row.name,
          }))
      )
    }

    return (
      <>
        <Button onClick={handleClick}>Get selected rows</Button>
        <Table tableProps={tableProps} ref={tableRef} />
        <div>
          Selected rows: {selectedRows.length}
        </div>
        <div>
          {JSON.stringify(selectedRows)}
        </div>
      </>
    )
  },
}
