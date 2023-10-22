import React, { useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Table, TableProps, TableRef } from '../../src';
import { columns, crudOptions, useQueryOptionsEagle } from './tableProps';
import { onSubmitFnWoRefresh } from './onSubmitFnWoRefresh';

const meta: Meta = {
  title: 'Tables/Eagle',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

const tableProps: TableProps<any> = {
  useQueryOptions: useQueryOptionsEagle,
  columns,
  crudOptions: {
    ...crudOptions,
    enableGlobalFilterLabels: undefined,
    // pagination: false
  },
  lazy: false,
}

export const EagleTemplateGlobal: Story = {
  args: {
    tableProps: tableProps
  },
  render: (props) => {
    const tableRef = useRef<TableRef>(null)
    props.tableProps.crudOptions.onSubmitFn = (data, action) => onSubmitFnWoRefresh(data, action, tableRef.current)

    return (
      <div>
        <div>
          This is Eagle load template
        </div>
        <div className='mt-3'>
          <Table {...props} ref={tableRef} />
        </div>
      </div>
    )

  }
}