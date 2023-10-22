import React, { useEffect, useRef, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { PageOptions, Table, TableProps, TableRef, matchString } from '../../src';
import { useQueryOptionsEagle } from './tableProps';
import { GeneratedData, getData } from '../../test/mock';
import { Col, Row } from 'react-bootstrap';
import Select, { MultiValue } from 'react-select'

const meta: Meta = {
  title: 'Tables/Filters',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

const options = [...new Set(getData().map(d => d.name))].map(d => ({
  label: d,
  value: d
}))


export const ExternalFilter: Story = {
  render: () => {

    const tableRef = useRef<TableRef>(null)
    const [value, setValue] = useState<MultiValue<{ label: string; value: any; }> | undefined>(undefined)
    const [pageOptions, setPageOptions] = useState<PageOptions>({
      page: 1,
      pageSize: 10,
      sorting: [],
    })

    useEffect(() => {
      tableRef.current?.setColumnFilter('name', value)
    }, [value])

    const tableProps: TableProps<GeneratedData> = {
      crudOptions: {
        primaryKey: 'uuid',
        pageOptions,
        setPageOptions,
      },
      lazy: false,
      useQueryOptions: useQueryOptionsEagle,
      columns: [
        {
          accessorKey: 'uuid',
        },
        {
          accessorKey: 'name',
          header: 'Name',
          enableSorting: true,
          filterFn: (row, columnId, values) => {
            const text = row.getValue(columnId) as string | number | null;
            return values.every((value) => value.some(v => matchString(text, v.value)))
          },
        },
        {
          accessorKey: 'description',
          header: 'Desc.',
          meta: {
            filterable: true
          }
        },
        {
          accessorKey: 'price',
          header: '€',
        }
      ],
    }

    return (
      <div>
        <Row>
          <Col xs={4}>
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={options}
              value={value ?? []}
              onChange={(values) => {
                setValue(values.length > 0 ? values : undefined)
              }}
              menuPosition={'fixed'}
            />
          </Col>
        </Row>
        <div className='mt-3'>
          <Table tableProps={tableProps} ref={tableRef} />
        </div>
      </div>
    )

  }
}
