import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import { CellContext, ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, TableOptions, useReactTable, VisibilityState } from "@tanstack/react-table";
import { type Table as ReactTable } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Table as BTable, Col, Row } from "react-bootstrap";
import { Tbody, Thead, TableToolbar, ModalForm } from "./index";
import { ActionCrud, EditButton, DeleteButton } from "@/index";
import { filterFn } from "@/lib";
import { globalFilterFn } from "@/lib/filterFn/globalFilterFn";
import { TableContext } from "./TableContext";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";

type CustomColumnFiltersState = Array<{
  id: string,
  value: Array<unknown>
}>


export type PropsRef = {
  setShowModal: (show: boolean) => void
  setIsLoadingModal: (isLoading: boolean) => void
  table: ReactTable<any>
};

export const Table = forwardRef<PropsRef>((_, ref) => {
  const tableContext = useContext(TableContext)
  const { t } = useTranslation()


  const [cellSelected, setCellSelected] = useState<CellContext<any, unknown> | undefined>(undefined)
  const [action, setAction] = useState<ActionCrud>('create')
  const [showModal, setShowModal] = useState(false)

  const [isLoadingModal, setIsLoadingModal] = useState(false)

  const INITIAL_VISIBLE_COLUMNS = (): VisibilityState => {
    const visibleColumns: VisibilityState = {}

    tableContext.columns.forEach((column) => {
      //@ts-ignore
      const columnId = column.id || column.accessorKey || column.Header
      if (!columnId) return
      visibleColumns[columnId] = column.meta?.visible === false ? false : true
    })

    return visibleColumns
  }

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(INITIAL_VISIBLE_COLUMNS);


  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  useEffect(() => {
    if (tableContext.isLazy) return
    const newColumnFilters: CustomColumnFiltersState = []

    tableContext.pageOptions.columnFilters?.forEach((columnFilter) => {
      newColumnFilters.push({
        id: columnFilter.id,
        value: [columnFilter.value],
      })
    })

    tableContext.pageOptions.inputFilters?.forEach((inputFilter) => {
      const columnFilter = newColumnFilters.find((columnFilter) => columnFilter.id === inputFilter.filter)

      if (columnFilter) {
        columnFilter.value.push(inputFilter.text)
      } else {
        newColumnFilters.push({
          id: inputFilter.filter,
          value: [inputFilter.text]
        })
      }
    })

    setColumnFilters(newColumnFilters)
  }, [tableContext.pageOptions.columnFilters, tableContext.pageOptions.inputFilters])


  const createButtonFn = () => {
    const action = () => {
      setCellSelected(undefined)
      setAction('create')
      setShowModal(true)
    }

    tableContext.crudOptions.createFn ? tableContext.crudOptions.createFn(action) : action()
  }

  const editButtonFn = (cell: CellContext<any, unknown>) => {
    const action = () => {
      setCellSelected(cell)
      setAction('edit')
      setShowModal(true)
    }

    tableContext.crudOptions.editFn ? tableContext.crudOptions.editFn(action, cell) : action()
  }

  const deleteButtonFn = (cell: CellContext<any, unknown>) => {
    const action = () => {
      setCellSelected(cell)
      setAction('delete')
      setShowModal(true)
    }

    tableContext.crudOptions.deleteFn ? tableContext.crudOptions.deleteFn(action, cell) : action()
  }

  const [columns, setColumns] = useState<Array<ColumnDef<any>>>([])
  useEffect(() => {
    const newColumns = [...tableContext.columns]

    newColumns.forEach((column) => {
      if (!column.filterFn) {
        column.filterFn = filterFn(column.meta?.type)
      }
    })

    if (tableContext.crudOptions.canSelectRow === true && tableContext.isLazy === false) {
      newColumns.unshift({
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      });
    }


    if (tableContext.crudOptions.edit) {
      const NewEditButton = tableContext.crudOptions.editButton ? tableContext.crudOptions.editButton : EditButton
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

    if (tableContext.crudOptions.delete) {
      const NewDeleteButton = tableContext.crudOptions.deleteButton ? tableContext.crudOptions.deleteButton : DeleteButton
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
  }, [tableContext.columns])

  const tablePropsLazy: TableOptions<any> = {
    columns: columns,
    data: tableContext.tableData,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: tableContext.pageOptions.sorting ?? [],
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    defaultColumn: {
      enableSorting: false,
    },
    onSortingChange: (sorting) => {
      if (typeof sorting !== 'function') {
        tableContext.setPageOptions({ ...tableContext.pageOptions, sorting })
      } else {
        const newSorting = sorting(tableContext.pageOptions.sorting ?? [])
        tableContext.setPageOptions({ ...tableContext.pageOptions, sorting: newSorting })
      }
    },
  }

  const tablePropsEagle: TableOptions<any> = {
    ...tablePropsLazy,
    getPaginationRowModel: tableContext.crudOptions.pagination === false ? undefined : getPaginationRowModel(),

    enableColumnFilters: true,
    state: {
      ...tablePropsLazy.state,
      globalFilter: tableContext.pageOptions.globalFilter ?? "",
      columnFilters,
      pagination: {
        pageIndex: tableContext.pageOptions.page - 1,
        pageSize: tableContext.pageOptions.pageSize,
      }
    },

    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalFilterFn,
    getColumnCanGlobalFilter: () => true,
    onGlobalFilterChange: (globalFilter) => tableContext.setPageOptions({ ...tableContext.pageOptions, globalFilter }),
    getSortedRowModel: getSortedRowModel(),
  }

  const tableProps = tableContext.isLazy ? tablePropsLazy : tablePropsEagle
  const customTableOptions: TableOptions<any> = {
    ...tableProps,
    ...tableContext.customTableOptions,
    state: {
      ...tableProps.state,
      ...tableContext.customTableOptions?.state,
    },
    autoResetPageIndex: false,
  }

  const table = useReactTable(customTableOptions)

  useImperativeHandle(ref, () => ({
    setShowModal,
    setIsLoadingModal,
    table,
  }));


  return (
    <>
      <div style={{ height: '100%' }}>
        <Row>
          <Col>
            <TableToolbar
              table={table}
              createButtonFn={createButtonFn}
            />
          </Col>
        </Row>

        <Row style={{ height: '100%' }}>
          <Col style={{ height: '100%' }}>
            <div style={{ height: '100%', overflowY: 'auto' }}>
              <BTable
                striped
                hover
                bordered
                responsive
              >
                <Thead table={table} />
                <Tbody table={table} />
              </BTable>
            </div>
          </Col>
        </Row>
      </div>

      <ModalForm
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

