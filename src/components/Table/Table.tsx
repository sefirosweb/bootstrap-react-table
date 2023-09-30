import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { CellContext, ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, Table as TableTanStackProp, useReactTable } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Table as BTable, Col, Row } from "react-bootstrap";
import { Tbody, Thead, TableToolbar, ModalForm, Tfooter } from "./index";
import { ActionCrud, CrudOptions, Filter, PageOptions, EditButton, DeleteButton } from "@/index";
import { Filters } from "@sefirosweb/react-multiple-search";
import { filterFn, textFilterFn } from "@/lib";

export type Props = {
  columns: Array<ColumnDef<any>>,
  crudOptions: CrudOptions<any>,
  tableData: Array<any>,
  isFetching: boolean,

  isLazy: boolean,
  pageSizes: Array<number>,
  pageOptions: PageOptions,
  setPageOptions: React.Dispatch<React.SetStateAction<PageOptions>>,
  pages?: number,
  totalRows?: number,
  refreshTable: () => void,
}

export type PropsRef = {
  setShowModal: (show: boolean) => void
  setIsLoadingModal: (isLoading: boolean) => void
};

export const Table = forwardRef<PropsRef, Props>((props, ref) => {
  const { t } = useTranslation()
  const [columns, setColumns] = useState<Array<ColumnDef<any>>>([])
  const [cellSelected, setCellSelected] = useState<CellContext<any, unknown> | null>(null)
  const [action, setAction] = useState<ActionCrud>('create')
  const [showModal, setShowModal] = useState(false)

  const [tableFilters, setTableFilters] = useState<Filter>({})
  const [dynamicFilters, setDynamicFilters] = useState<Array<Filters>>([]);
  const [isLoadingModal, setIsLoadingModal] = useState(false)

  // Tan stack types
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    if (!props.isLazy) return

    const filters: Array<Filters> = [...dynamicFilters];

    for (const key in tableFilters) {
      filters.push({
        filter: key,
        label: key,
        text: tableFilters[key],
      })
    }

    if (globalFilter !== '') {
      filters.push({
        filter: 'globalFilter',
        label: 'globalFilter',
        text: globalFilter,
      })
    }

    props.setPageOptions({ ...props.pageOptions, filters: filters })

  }, [tableFilters, dynamicFilters, globalFilter])

  useEffect(() => {
    if (props.isLazy) return

    const newColumnFilters: ColumnFiltersState = []

    for (const key in tableFilters) {
      newColumnFilters.push({
        id: key,
        value: tableFilters[key],
      })
    }

    setColumnFilters(newColumnFilters)
  }, [tableFilters])


  const createButtonFn = () => {
    const action = () => {
      setCellSelected(null)
      setAction('create')
      setShowModal(true)
    }

    props.crudOptions.createFn ? props.crudOptions.createFn(action) : action()
  }

  const editButtonFn = (cell: CellContext<any, unknown>) => {
    const action = () => {
      setCellSelected(cell)
      setAction('edit')
      setShowModal(true)
    }

    props.crudOptions.editFn ? props.crudOptions.editFn(action, cell) : action()
  }

  const deleteButtonFn = (cell: CellContext<any, unknown>) => {
    const action = () => {
      setCellSelected(cell)
      setAction('delete')
      setShowModal(true)
    }

    props.crudOptions.deleteFn ? props.crudOptions.deleteFn(action, cell) : action()
  }

  useEffect(() => {
    const newColumns = [...props.columns]

    newColumns.forEach((column) => {
      column.filterFn = filterFn(column.meta?.type)
    })

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
    table = useReactTable({
      columns: columns,
      data: props.tableData,

      initialState: {
        pagination: {
          pageSize: props.pageOptions.pageSize,
        },
      },

      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),

      enableColumnFilters: true,
      state: {
        globalFilter,
        columnFilters,
      },

      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      globalFilterFn: textFilterFn,
      getColumnCanGlobalFilter: () => true,
      onGlobalFilterChange: setGlobalFilter,
    });
  }

  useImperativeHandle(ref, () => ({
    setShowModal,
    setIsLoadingModal,
  }));


  return (
    <>
      <Row>
        <Col>
          <TableToolbar
            crudOptions={props.crudOptions}
            createButtonFn={createButtonFn}
            setDynamicFilters={setDynamicFilters}
            setGlobalFilter={setGlobalFilter}
            refreshTable={props.refreshTable}
            isLoading={props.isFetching}
          />
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
            <Thead table={table} tableFilters={tableFilters} setTableFilters={setTableFilters} crudOptions={props.crudOptions} />
            {props.isFetching && <div>Looading</div>}
            <Tbody table={table} />
            {props.isFetching && <div>Looading</div>}
          </BTable>

        </Col>
      </Row>

      {props.isLazy &&
        <Tfooter
          pages={props.pages ?? 1}
          currentPage={props.pageOptions.page}
          totalRows={props.totalRows ?? 0}

          handleFirstPage={() => props.setPageOptions({ ...props.pageOptions, page: 1 })}
          handlePrevPage={() => props.setPageOptions({ ...props.pageOptions, page: props.pageOptions.page - 1 })}
          handleNextPage={() => props.setPageOptions({ ...props.pageOptions, page: props.pageOptions.page + 1 })}
          handleLastPage={() => props.setPageOptions({ ...props.pageOptions, page: props.pages ?? 1 })}

          firstPageEnabled={props.pageOptions.page === 1}
          prevPageEnabled={props.pageOptions.page === 1}
          nextPageEnabled={props.pageOptions.page === props.pages}
          lastPageEnabled={props.pageOptions.page === props.pages}


          pageSizes={props.pageSizes}
          pageSize={props.pageOptions.pageSize}
          setPageSize={(pageSize) => props.setPageOptions({ ...props.pageOptions, pageSize: pageSize, page: 1 })}
        />
      }

      {!props.isLazy &&
        <Tfooter
          pages={table.getPageCount() === 0 ? 1 : table.getPageCount()}
          currentPage={table.getState().pagination.pageIndex + 1}
          totalRows={props.tableData.length}

          handleFirstPage={() => table.setPageIndex(0)}
          handlePrevPage={() => table.previousPage()}
          handleNextPage={() => table.nextPage()}
          handleLastPage={() => table.setPageIndex(table.getPageCount() - 1)}

          firstPageEnabled={!table.getCanPreviousPage()}
          prevPageEnabled={!table.getCanPreviousPage()}
          nextPageEnabled={!table.getCanNextPage()}
          lastPageEnabled={!table.getCanNextPage()}


          pageSizes={props.pageSizes}
          pageSize={props.pageOptions.pageSize}
          setPageSize={(pageSize) => {
            props.setPageOptions({ ...props.pageOptions, pageSize: pageSize })
            table.setPageSize(pageSize)
          }}
        />
      }

      <ModalForm
        crudOptions={props.crudOptions}
        action={action}
        showModal={showModal}
        setShowModal={setShowModal}
        cell={cellSelected}
        table={table}
        isLoadingModal={isLoadingModal}
      />

    </>
  )
});

