import React, { useRef, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Table, TableProps, TableRef } from '../../src';
import { useQueryOptionsEagle } from './tableProps';
import { GeneratedData, getData } from '../../test/mock';
import Select from 'react-select'

const meta: Meta = {
  title: 'Tables/Forms',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

const options = [...new Set(getData().map(d => d.name))].map(d => ({
  label: d,
  value: d
}))



export const CustomForm: Story = {
  render: () => {
    const tableRef = useRef<TableRef>(null)

    const [response, setResponse] = useState<string>('')

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
        },
        {
          accessorKey: 'description',
          header: 'Desc.',
        },
        {
          accessorKey: 'price',
          header: '€',
          enableSorting: true,
        },
        {
          id: 'custom',
          header: 'Custom',
          accessorFn: () => 'Custom data',
          meta: {
            editable: true,
            customForm: ({ value, setValue }) => {
              return (
                <>
                  <div>Custom form</div>
                  <div>
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
                  </div>
                </>
              )
            },
          }
        }
      ],
      crudOptions: {
        primaryKey: 'uuid',
        edit: true,
        onSubmitFn: (data, action) => {
          return new Promise((resolve, reject) => {

            setResponse(JSON.stringify(data))
            tableRef.current?.setShowModal(false)

            resolve(null)
          })
        },
      },
      lazy: false
    }

    return (
      <div>
        <div className='mt-3'>
          <Table tableProps={tableProps} ref={tableRef} />
        </div>
        <div className='mt-3'>
          onSubmitFn:
        </div>
        <div className='mt-3'>
          {response}
        </div>
      </div>
    )

  }
}
