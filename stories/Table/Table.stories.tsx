import React, { useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Table, TableRef } from '../../src';
import { columns, crudOptions, onSubmitFn, useQueryOptionsLazy } from './tableProps';

const meta: Meta = {
  title: 'Tables/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

// const crudOptions2 = { ...crudOptions, enableGlobalFilterLabels: undefined }

export const LazyTemplate: Story = {
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsLazy,
      columns,
      crudOptions,
      lazy: true
    }
  },
  render: (props) => {
    const tableRef = useRef<TableRef>(null)
    crudOptions.onSubmitFn = (data, action) => onSubmitFn(data, action, tableRef.current)

    return (
      <div>
        <div>
          This is Lazy load template
        </div>
        <div className='mt-3'>
          <Table {...props} ref={tableRef} />
        </div>
      </div>
    )

  }
}

// export const LazyTemplateGlobal: Story = {
//   args: {
//     tableProps: {
//       useQueryOptions: useQueryOptionsLazy,
//       columns,
//       crudOptions: crudOptions2,
//       lazy: true
//     }
//   },
// }

// export const EagleTemplate: Story = {
//   args: {
//     tableProps: {
//       useQueryOptions: useQueryOptionsEagle,
//       columns,
//       crudOptions,
//       lazy: false
//     }
//   },
// }

// export const EagleTemplateGlobal: Story = {
//   args: {
//     tableProps: {
//       useQueryOptions: useQueryOptionsEagle,
//       columns,
//       crudOptions: crudOptions2,
//       lazy: false
//     }
//   },
// }
