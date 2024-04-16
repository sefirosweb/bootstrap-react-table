import React, { useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Table, TableRef } from '../../src';
import { columns, crudOptions, useQueryOptionsEagle } from './tableProps';
import { onSubmitFnWoRefresh } from './onSubmitFnWoRefresh';

const meta: Meta = {
  title: 'Tables/Style',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const ResponsiveTemplate: Story = {
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsEagle,
      columns,
      crudOptions: { ...crudOptions },
      lazy: false
    }
  },
  render: (props) => {
    const tableRef = useRef<TableRef>(null)
    props.tableProps.crudOptions.onSubmitFn = (data, action) => onSubmitFnWoRefresh(data, action, tableRef.current)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)' }}>
        <Table {...props} ref={tableRef} />
      </div>
    )

  }
}
