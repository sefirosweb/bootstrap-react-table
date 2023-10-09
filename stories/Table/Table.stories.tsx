import React, { useEffect, useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { PageOptions, Table, TableRef } from '../../src';
import { columns, crudOptions, onSubmitFn, onSubmitFnWoRefresh, useQueryOptionsEagle, useQueryOptionsLazy } from './tableProps';
import { Button } from 'react-bootstrap';

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


    const [pageOptions, setPageOptions] = React.useState<PageOptions>({
      filters: [],
      page: 1,
      pageSize: 5,
      sorting: [],
    })

    props.tableProps.crudOptions.onSubmitFn = (data, action) => onSubmitFn(data, action, tableRef.current)
    props.tableProps.crudOptions.pageOptions = pageOptions;
    props.tableProps.crudOptions.setPageOptions = setPageOptions;

    useEffect(() => {
      console.log('pageOptions from story', pageOptions)
    }, [pageOptions])

    return (
      <div>
        <div>
          This is Lazy load template
        </div>
        <div>
          <Button onClick={() => {
            setPageOptions({
              ...pageOptions,
              pageSize: 10
            })
          }}>
            Change Page
          </Button>
        </div>
        <div className='mt-3'>
          <Table {...props} ref={tableRef} />
          d</div>
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
    props.tableProps.crudOptions.onSubmitFn = (data, action) => onSubmitFn(data, action, tableRef.current)

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