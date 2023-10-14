import React, { useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Table, TableRef } from '../../src';
import { columns, crudOptions, useQueryOptionsEagle } from './tableProps';
import { onSubmitFnWoRefresh } from './onSubmitFnWoRefresh';

const meta: Meta = {
  title: 'Tables/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const EagleTemplateGlobal: Story = {
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
    props.tableProps.crudOptions.enableGlobalFilterLabels = undefined


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