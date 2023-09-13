import { forwardRef, Ref, useEffect, useState } from "react";
import { CellContext, ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Table as BTable, Col, Row } from "react-bootstrap";
import { Tfooter, Tbody, Thead, TableToolbar, ModalForm } from "./index";
import { ActionCrud, CrudOptions, Filter, PageOptions, QueryPage, EditButton, DeleteButton } from "@/index";

export type Props = {
  useQueryOptions: UseQueryOptions<QueryPage<any>>,
  columns: Array<ColumnDef<any>>,
  crudOptions: CrudOptions<any>,
}

export type PropsRef = {
};

export const Table = forwardRef<PropsRef, Props>((props, ref) => {
  const { t } = useTranslation()
  const [columns, setColumns] = useState<Array<ColumnDef<any>>>([])
  const [cellSelected, setCellSelected] = useState<CellContext<any, unknown> | null>(null)
  const [action, setAction] = useState<ActionCrud>('create')
  const [show, setShow] = useState(false)
  const [tableFilters, setTableFilters] = useState<Filter>({})

  const pageSizes = props.crudOptions.pageSizes ?? [10, 25, 50, 100, 500]

  const INITIAL_PAGE_OPTIONS = (): PageOptions => {
    const pageSize = props.crudOptions.pageSize ?? pageSizes[0]
    const filters: Array<Filter> = []
    return {
      page: 1,
      pageSize: pageSize,
      filters: filters,
    }
  }

  const [pageOptions, setPageOptions] = useState<PageOptions>(INITIAL_PAGE_OPTIONS)

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('filters', tableFilters)
    }, 230)
    return () => clearTimeout(timeout)
  }, [tableFilters])

  const INITIAL_DATA: QueryPage<any> = {
    results: [],
    pages: 0,
    nextCursor: null,
    prevCursor: null,
  }

  const useQueryOptions: UseQueryOptions<QueryPage<any>> = {
    staleTime: Infinity,
    initialDataUpdatedAt: 0,
    keepPreviousData: true,
    initialData: INITIAL_DATA,
    ...props.useQueryOptions,
    queryKey: [props.useQueryOptions.queryKey, pageOptions],
    queryFn: (params) => {
      if (!props.useQueryOptions.queryFn) {
        return Promise.reject(new Error('No query function provided'));
      }

      const pageConfig = params.queryKey[1] as PageOptions

      params.meta = {
        page: pageConfig?.page ?? pageOptions.page,
        pageSize: pageConfig?.pageSize ?? pageOptions.pageSize,
        filters: pageConfig?.filters ?? [],
      }

      return props.useQueryOptions.queryFn(params)
    },
  }

  const { data: tableData, isFetching } = useQuery(useQueryOptions)

  const createButtonFn = () => {
    const action = () => {
      setCellSelected(null)
      setAction('create')
      setShow(true)
    }

    props.crudOptions.createFn ? props.crudOptions.createFn(action) : action()
  }

  const editButtonFn = (cell: CellContext<any, unknown>) => {
    const action = () => {
      setCellSelected(cell)
      setAction('edit')
      setShow(true)
    }

    props.crudOptions.editFn ? props.crudOptions.editFn(action, cell) : action()
  }

  const deleteButtonFn = (cell: CellContext<any, unknown>) => {
    const action = () => {
      setCellSelected(cell)
      setAction('delete')
      setShow(true)
    }

    props.crudOptions.deleteFn ? props.crudOptions.deleteFn(action, cell) : action()
  }

  useEffect(() => {
    const newColumns = [...props.columns]

    if (props.crudOptions.edit) {
      const NewEditButton = props.crudOptions.editButton ? props.crudOptions.editButton : EditButton
      newColumns.push({
        id: 'update_button',
        header: t('Edit'),
        cell: (cell) => <NewEditButton
          cell={cell}
          onClick={() => {
            editButtonFn(cell)
          }}
        />
      })
    }

    if (props.crudOptions.delete) {
      const NewDeleteButton = props.crudOptions.deleteButton ? props.crudOptions.deleteButton : DeleteButton
      newColumns.push({
        id: 'delete_button',
        header: t('Delete'),
        cell: (cell) => <NewDeleteButton
          cell={cell}
          onClick={() => {
            deleteButtonFn(cell)
          }}
        />
      })
    }

    setColumns(newColumns)
  }, [props.columns])

  const table = useReactTable({
    columns: columns,
    data: tableData?.results ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Row>
        <Col>
          <TableToolbar crudOptions={props.crudOptions} createButtonFn={createButtonFn} />
        </Col>
      </Row>
      <Row>
        <Col>
          <BTable
            striped
            hover
            bordered
            responsive
          >
            <Thead table={table} tableFilters={tableFilters} setTableFilters={setTableFilters} />
            <Tbody table={table} />

          </BTable>

          <Tfooter
            pages={tableData?.pages ?? 1}
            currentPage={pageOptions.page}
            setCurrentPage={(currentPage: number) => {
              setPageOptions({
                ...pageOptions,
                page: currentPage,
              })
            }}
            pageSizes={pageSizes}
            pageSize={pageOptions.pageSize}
            setPageSize={(pageS: number) => {
              setPageOptions({
                ...pageOptions,
                page: 1,
                pageSize: pageS,
              })
            }} />

        </Col>
      </Row>

      <ModalForm
        crudOptions={props.crudOptions}
        action={action}
        show={show}
        setShow={setShow}
        cell={cellSelected}
        table={table}
      />

    </>
  )
});

