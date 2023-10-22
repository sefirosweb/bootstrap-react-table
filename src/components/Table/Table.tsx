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
import { VirtualTable } from "./VirtualTable";

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
  const props = useContext(TableContext)
  const { t } = useTranslation()

  const [columns, setColumns] = useState<Array<ColumnDef<any>>>([])
  const [cellSelected, setCellSelected] = useState<CellContext<any, unknown> | undefined>(undefined)
  const [action, setAction] = useState<ActionCrud>('create')
  const [showModal, setShowModal] = useState(false)

  const [isLoadingModal, setIsLoadingModal] = useState(false)

  const INITIAL_VISIBLE_COLUMNS = (): VisibilityState => {
    const visibleColumns: VisibilityState = {}

    props.columns.forEach((column) => {
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
    if (props.isLazy) return
    const newColumnFilters: CustomColumnFiltersState = []

    props.pageOptions.columnFilters?.forEach((columnFilter) => {
      newColumnFilters.push({
        id: columnFilter.id,
        value: [columnFilter.value],
      })
    })

    props.pageOptions.inputFilters?.forEach((inputFilter) => {
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
  }, [props.pageOptions.columnFilters, props.pageOptions.inputFilters])


  const createButtonFn = () => {
    const action = () => {
      setCellSelected(undefined)
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
      if (!column.filterFn) {
        column.filterFn = filterFn(column.meta?.type)
      }
    })

    if (props.crudOptions.canSelectRow === true && props.isLazy === false) {
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

  const tableProps: TableOptions<any> = {
    columns: columns,
    data: props.tableData,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: props.pageOptions.sorting ?? [],
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    defaultColumn: {
      enableSorting: false,
    },
    onSortingChange: (sorting) => {
      if (typeof sorting !== 'function') {
        props.setPageOptions({ ...props.pageOptions, sorting })
      } else {
        const newSorting = sorting(props.pageOptions.sorting ?? [])
        props.setPageOptions({ ...props.pageOptions, sorting: newSorting })
      }
    },
  }

  const tablePropsEagle: TableOptions<any> = {
    ...tableProps,
    initialState: {
      pagination: {
        pageSize: props.pageOptions.pageSize,
      },
    },
    getPaginationRowModel: props.crudOptions.pagination === false ? undefined : getPaginationRowModel(),

    enableColumnFilters: true,
    state: {
      ...tableProps.state,
      globalFilter: props.pageOptions.globalFilter ?? "",
      columnFilters,
    },

    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalFilterFn,
    getColumnCanGlobalFilter: () => true,
    onGlobalFilterChange: (globalFilter) => props.setPageOptions({ ...props.pageOptions, globalFilter }),
    getSortedRowModel: getSortedRowModel(),
  }

  const table = useReactTable(props.isLazy ? tableProps : tablePropsEagle)

  useImperativeHandle(ref, () => ({
    setShowModal,
    setIsLoadingModal,
    table,
  }));


  return (
    <>
      <div>
        <Row>
          <Col>
            <TableToolbar
              table={table}
              createButtonFn={createButtonFn}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <div style={{ height: '80vh' }}>

              <VirtualTable table={table} />
              {/* <BTable
                striped
                hover
                bordered
                responsive
              >
                <Thead table={table} />
                <Tbody table={table} />
              </BTable> */}
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

