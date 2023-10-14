import React, { useRef, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { PageOptions, Table, TableRef } from '../../src';
import { columns, crudOptions, useQueryOptionsLazy } from './tableProps';
import { Button } from 'react-bootstrap';
import { getData, getRandom } from '../../test/mock';
import { generateOptionsValue } from '../../test/mock/generateOptionsValue';
import { DateTime } from 'luxon';
import { onSubmitFn } from './onSubmitFn';

const meta: Meta = {
  title: 'Tables/Lazy',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

const newPageOptions: PageOptions = {
  pageSize: 5,
  page: 1,
  inputFilters: [
    {
      filter: 'description',
      label: 'Desc.',
      text: "!" + getRandom(getRandom(generateOptionsValue()).description.split(' ')),
    },
  ],
  globalFilter: getRandom(getRandom(generateOptionsValue()).description.split(' ')),
  columnFilters: [
    {
      id: 'price',
      value: [100, null],
    },
    {
      id: 'name',
      value: getRandom(getData()).name,
    },
    {
      id: 'id_category',
      value: getRandom(generateOptionsValue()).uuid,
    },
    {
      id: 'created_at_date',
      value: [null, DateTime.now().toISODate()],
    },
    {
      id: 'created_at',
      value: [DateTime.now().minus({ days: 7 }).toFormat("yyyy-MM-dd'T'HH:mm:ss"), null],
    },
  ],
  sorting: [
    {
      desc: true,
      id: 'created_at'
    }
  ],
}

export const LazyTemplateGlobal: Story = {
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsLazy,
      columns,
      crudOptions: { ...crudOptions },
      lazy: true
    }
  },
  render: (props) => {
    const tableRef = useRef<TableRef>(null)
    const [pageOptions, setPageOptions] = useState<PageOptions>({
      page: 1,
      pageSize: 10,
      sorting: [],
    })

    props.tableProps.crudOptions.enableGlobalFilterLabels = undefined
    props.tableProps.crudOptions.onSubmitFn = (data, action) => onSubmitFn(data, action, tableRef.current)
    props.tableProps.crudOptions.pageOptions = pageOptions;
    props.tableProps.crudOptions.setPageOptions = setPageOptions;
    props.tableProps.crudOptions.delayFilter = 800

    return (
      <div>
        <div>
          This is Lazy load template
        </div>
        <div>
          <Button onClick={() => {
            setPageOptions({
              ...pageOptions,
              ...newPageOptions,
              inputFilters: [],
            })
          }}>
            Change Page & apply filters
          </Button>
        </div>
        <div className='mt-3'>
          <Table {...props} ref={tableRef} />
        </div>
      </div>
    )

  }
}

