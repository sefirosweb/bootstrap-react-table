import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import { CellContext, ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, Table as TableTanStackProp, useReactTable, VisibilityState } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Table as BTable, Col, Row } from "react-bootstrap";
import { Tbody, Thead, TableToolbar, ModalForm } from "./index";
import { ActionCrud, Filter, EditButton, DeleteButton } from "@/index";
import { Filters } from "@sefirosweb/react-multiple-search";
import { filterFn } from "@/lib";
import { globalFilterFn } from "@/lib/filterFn/globalFilterFn";
import { TableContext } from "./TableContext";
import { Pagination } from "./Pagination";

type CustomColumnFiltersState = Array<{
  id: string,
  value: Array<unknown>
}>

export type PropsRef = {
  setShowModal: (show: boolean) => void
  setIsLoadingModal: (isLoading: boolean) => void
};

export const Table = forwardRef<PropsRef>((_, ref) => {
  const props = useContext(TableContext)

  const { t } = useTranslation()
  const [columns, setColumns] = useState<Array<ColumnDef<any>>>([])
  const [cellSelected, setCellSelected] = useState<CellContext<any, unknown> | null>(null)
  const [action, setAction] = useState<ActionCrud>('create')
  const [showModal, setShowModal] = useState(false)


  const [tableFilters, setTableFilters] = useState<Filter>({})
  const [dynamicFilters, setDynamicFilters] = useState<Array<Filters>>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [isLoadingModal, setIsLoadingModal] = useState(false)

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>(props.pageOptions.sorting ?? []);

  const INITIAL_VISIBLE_COLUMNS = (): VisibilityState => {
    const visibleColumns: VisibilityState = {}
    props.columns.forEach((column) => {
      //@ts-ignore
      // const id = column.id ? column.id : (column.accessorKey ? column.accessorKey : column.header)
      const id = column.id

      if (!id) return
      visibleColumns[id] = column.meta?.visible === false ? false : true
    })

    return visibleColumns
  }

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(INITIAL_VISIBLE_COLUMNS);

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

    const newColumnFilters: CustomColumnFiltersState = []

    for (const key in tableFilters) {
      newColumnFilters.push({
        id: key,
        value: [tableFilters[key]],
      })
    }

    if (dynamicFilters) {
      dynamicFilters.forEach((filter) => {
        const columnFilter = newColumnFilters.find((columnFilter) => columnFilter.id === filter.filter)
        if (columnFilter) {
          columnFilter.value.push(filter.text)
        } else {
          newColumnFilters.push({
            id: filter.filter,
            value: [filter.text]
          })
        }
      })
    }

    setColumnFilters(newColumnFilters)
  }, [tableFilters, dynamicFilters])

  useEffect(() => {
    if (props.pageOptions.sorting === sorting) return
    props.setPageOptions({ ...props.pageOptions, sorting: sorting })
  }, [sorting])

  useEffect(() => {
    if (props.pageOptions.sorting === sorting) return
    setSorting(props.pageOptions.sorting)
  }, [props.pageOptions.sorting])

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

      state: {
        sorting,
        columnVisibility,
      },

      defaultColumn: {
        enableSorting: false,
      },

      onColumnVisibilityChange: setColumnVisibility,
      onSortingChange: setSorting,
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
        sorting,
        columnVisibility,
      },

      defaultColumn: {
        enableSorting: false,
      },

      onColumnVisibilityChange: setColumnVisibility,
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      globalFilterFn: globalFilterFn,
      getColumnCanGlobalFilter: () => true,
      onGlobalFilterChange: setGlobalFilter,
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      autoResetPageIndex: false,
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
            table={table}
            createButtonFn={createButtonFn}
            setDynamicFilters={setDynamicFilters}
            setGlobalFilter={setGlobalFilter}
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
            <Thead table={table} tableFilters={tableFilters} setTableFilters={setTableFilters} />
            <Tbody table={table} />
          </BTable>

        </Col>
      </Row>

      <Pagination table={table} />

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

