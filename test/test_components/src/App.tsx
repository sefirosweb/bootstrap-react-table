import React from "react"
import { Table, TableProps } from "../../../src"
import { Container } from "react-bootstrap"
import { useQueryOptionsLazy } from "../../../stories/Table/tableProps"
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
      },
      {
        accessorKey: 'name',
      },
      {
        accessorKey: 'description'
      },
      {
        accessorKey: 'created_at',
        meta: {
          filterable: true,
          type: 'date',
        }
      },
    ],
    useQueryOptions: useQueryOptionsLazy
  }

  return (
    <>
      <Container className="mt-5">

        <Table tableProps={tableProps} />
      </Container>
    </>
  )
}
