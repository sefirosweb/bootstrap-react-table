import React, { useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Table, TableProps, matchString } from '../../src';
import { useQueryOptionsEagle } from './tableProps';
import { GeneratedData, getData } from '../../test/mock';
import { Form } from 'react-bootstrap';
import Select from 'react-select'

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


const tableProps: TableProps<GeneratedData> = {
  useQueryOptions: useQueryOptionsEagle,
  columns: [
    {
      accessorKey: 'uuid',
      header: () => (
        <div>
          <div>
            Random filter
          </div>
          <div>
            Executed filter: {`filterFn: (value, filter) => Math.random() > 0.9;`}
          </div>

        </div>
      ),
      filterFn: (value, filter) => Math.random() > 0.9,
      meta: {
        filterable: true,
      }
    },
    {
      accessorKey: 'name',
      header: 'Name',
      enableSorting: true,
      filterFn: (row, columnId, values) => {
        const text = row.getValue(columnId) as string | number | null;
        return values.every((value) => value.some(v => matchString(text, v.value)))
      },
      meta: {
        filterable: true,
        customFilter: ({ header, value, setValue }) => {

          return (
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
          )
        }
      }
    },
    {
      accessorKey: 'description',
      header: 'Desc.',
      meta: {
        filterable: true,
        customFilter: ({ header, value, setValue }) => {

          return (
            <div>
              <div>
                Column: {header.column.id}
              </div>
              <div>
                <Form.Control value={value ?? ''} onChange={(e) => { setValue(e.target.value) }} />
              </div>
            </div>
          )
        }
      }
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

export const CustomFilter: Story = {
  args: {
    tableProps: tableProps
  },
}
