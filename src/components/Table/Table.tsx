import React, { forwardRef, lazy, Ref, useEffect, useState } from "react";
import { CellContext, ColumnDef, getCoreRowModel, getPaginationRowModel, Table as TableTanStackProp, useReactTable } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Table as BTable, Col, Row } from "react-bootstrap";
import { Tbody, Thead, TableToolbar, ModalForm, Tfooter } from "./index";
import { ActionCrud, CrudOptions, Filter, PageOptions, EditButton, DeleteButton } from "@/index";

export type Props = {
  columns: Array<ColumnDef<any>>,
  crudOptions: CrudOptions<any>,
  tableData: Array<any>,
  isFetching: boolean,

  isLazy: boolean,
  pageOptions: PageOptions,
  setPageOptions: React.Dispatch<React.SetStateAction<PageOptions>>,
  pages?: number,
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

  const { pageOptions, setPageOptions, pages = 1 } = props

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


  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('filters', tableFilters)
    }, 230)
    return () => clearTimeout(timeout)
  }, [tableFilters])


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

  let table: TableTanStackProp<any>

  if (props.isLazy) {
    table = useReactTable({
      columns: columns,
      data: props.tableData,
      getCoreRowModel: getCoreRowModel(),
    });
  } else {

    console.log(pageOptions.pageSize)
    table = useReactTable({
      columns: columns,
      data: props.tableData,
      initialState: {
        pagination: {
          pageSize: pageOptions.pageSize,
        },
      },
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
  }

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
            {props.isFetching && <div>Looading</div>}
            <Tbody table={table} />
            {props.isFetching && <div>Looading</div>}
          </BTable>

        </Col>
      </Row>

      {props.isLazy &&
        <Tfooter
          pages={pages}
          currentPage={pageOptions.page}

          handleFirstPage={() => setPageOptions({ ...pageOptions, page: 1 })}
          handlePrevPage={() => setPageOptions({ ...pageOptions, page: pageOptions.page - 1 })}
          handleNextPage={() => setPageOptions({ ...pageOptions, page: pageOptions.page + 1 })}
          handleLastPage={() => setPageOptions({ ...pageOptions, page: pages ?? 1 })}

          firstPageEnabled={pageOptions.page === 1}
          prevPageEnabled={pageOptions.page === 1}
          nextPageEnabled={pageOptions.page === pages}
          lastPageEnabled={pageOptions.page === pages}


          pageSizes={pageSizes}
          pageSize={pageOptions.pageSize}
          setPageSize={(pageSize) => setPageOptions({ ...pageOptions, pageSize: pageSize, page: 1 })}
        />
      }

      {!props.isLazy &&
        <Tfooter
          pages={table.getPageCount() === 0 ? 1 : table.getPageCount()}
          currentPage={table.getState().pagination.pageIndex + 1}

          handleFirstPage={() => table.setPageIndex(0)}
          handlePrevPage={() => table.previousPage()}
          handleNextPage={() => table.nextPage()}
          handleLastPage={() => table.setPageIndex(table.getPageCount() - 1)}

          firstPageEnabled={!table.getCanPreviousPage()}
          prevPageEnabled={!table.getCanPreviousPage()}
          nextPageEnabled={!table.getCanNextPage()}
          lastPageEnabled={!table.getCanNextPage()}


          pageSizes={pageSizes}
          pageSize={pageOptions.pageSize}
          setPageSize={(pageSize) => {
            setPageOptions({ ...pageOptions, pageSize: pageSize })
            table.setPageSize(pageSize)
          }}
        />
      }

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

