import React from "react"
import { Table, TableProps } from "../../../src"
import { Button, Container } from "react-bootstrap"
import { optionsCategory, useQueryOptionsLazy } from "../../../stories/Table/tableProps"
import { GeneratedData } from "../../mock"
import { useUrlPageParams } from "./lib/useUrlPageParams"

export const App: React.FC = () => {
  const [pageOptions, setPageOptions] = useUrlPageParams('/')

  const tableProps: TableProps<GeneratedData> = {
    lazy: true,
    crudOptions: {
      primaryKey: 'uuid',
      pageOptions,
      setPageOptions,
    },
    columns: [
      {
        accessorKey: 'uuid',
        enableSorting: true,
      },
      {
        accessorKey: 'name',
        enableSorting: true,
      },
      {
        accessorKey: 'description',
        enableSorting: true,
        meta: {
          filterable: true,
          type: 'text',
        }
      },
      {
        accessorKey: 'price',
        enableSorting: true,
        meta: {
          filterable: true,
          type: 'number',
        }
      },
      {
        id: 'id_category',
        accessorKey: 'category.name',
        enableSorting: true,
        meta: {
          filterable: true,
          type: 'select',
          useQueryOptions: optionsCategory,
        }
      },
      {
        accessorKey: 'created_at',
        enableSorting: true,
        meta: {
          filterable: true,
          type: 'date',
        }
      },
      {
        id: 'created_at_time',
        accessorKey: 'created_at',
        enableSorting: true,
        meta: {
          filterable: true,
          type: 'datetime',
        }
      },
    ],
    useQueryOptions: useQueryOptionsLazy
  }

  return (
    <>
      <Container className="mt-5" fluid>
        <a href="/">
          <Button>Go to Home</Button>
        </a>
        <Table tableProps={tableProps} />
      </Container>
    </>
  )
}
