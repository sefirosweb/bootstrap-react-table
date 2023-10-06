import React, { useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Table, TableRef } from '../../src';
import { columns, crudOptions, onSubmitFn, onSubmitFnWoRefresh, useQueryOptionsEagle, useQueryOptionsLazy } from './tableProps';

const meta: Meta = {
  title: 'Tables/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

const crudOptions2 = { ...crudOptions, enableGlobalFilterLabels: undefined }

export const LazyTemplate: Story = {
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsLazy,
      columns,
      crudOptions: {
        ...crudOptions,
        exportFn: (props) => console.log('Add custom export', props),
      },
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

export const LazyTemplateGlobal: Story = {
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsLazy,
      columns,
      crudOptions: crudOptions2,
      lazy: true
    }
  },
  render: (props) => {
    const tableRef = useRef<TableRef>(null)
    crudOptions2.onSubmitFn = (data, action) => onSubmitFn(data, action, tableRef.current)

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

export const EagleTemplate: Story = {
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsEagle,
      columns,
      crudOptions,
      lazy: false
    }
  },
  render: (props) => {
    const tableRef = useRef<TableRef>(null)
    crudOptions.onSubmitFn = (data, action) => onSubmitFnWoRefresh(data, action, tableRef.current)

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

export const EagleTemplateGlobal: Story = {
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsEagle,
      columns,
      crudOptions: crudOptions2,
      lazy: false
    }
  },
  render: (props) => {
    const tableRef = useRef<TableRef>(null)
    crudOptions2.onSubmitFn = (data, action) => onSubmitFnWoRefresh(data, action, tableRef.current)

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