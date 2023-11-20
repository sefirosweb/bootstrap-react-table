import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap";
import { QueryEagle, SelectOption, Table, TableProps } from "@/index";
import { useTranslation } from "react-i18next";
import { CellContext } from "@tanstack/react-table";
import { useObserveQuery } from "@/lib/useObserveQuery";

export type Props = {
    multiSelectUnique?: boolean
    useQueryOptions?: UseQueryOptions<Array<SelectOption>>
    cellSelected?: CellContext<any, unknown>
    handleChange: (option: Array<any>) => void
    tableProps?: (cell?: CellContext<any, unknown>) => TableProps<any>
}

export const FormMultiSelect: React.FC<Props> = (props) => {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const { t } = useTranslation()

    if (!props.useQueryOptions) throw new Error("useQueryOptions is required");
    if (!props.tableProps) throw new Error("tableProps is required");

    const queryClient = useQueryClient()

    const useQueryOptions: UseQueryOptions<Array<SelectOption>> = {
        staleTime: Infinity,
        initialData: [],
        initialDataUpdatedAt: 0,
        ...props.useQueryOptions,
    }

    const { data: selectData } = useQuery(useQueryOptions)
    useEffect(() => {
        const firstValue = selectData ? selectData[0] : undefined
        if (selectedOption === "" && firstValue) {
            setSelectedOption(firstValue.value)
        }

    }, [selectData])

    const tablePropsFn = props.tableProps(props.cellSelected)
    const queryKey = ['FormMultiSelect']

    if (tablePropsFn.lazy === true) {
        if (!props.cellSelected) throw new Error("Lazy mode not supported for multi select form");
    }

    const { data: tableValues } = useObserveQuery<QueryEagle<any>>(queryKey)

    useEffect(() => {
        if (!tableValues) {
            props.handleChange([])
            return
        }

        const values = tableValues.results.map(v => v[tablePropsFn.crudOptions.primaryKey])
        props.handleChange(values)
    }, [tableValues])

    const addFn = async () => {
        await queryClient.setQueryData<QueryEagle<any>>(queryKey, (old) => {
            if (!old) {
                return {
                    results: []
                }
            }

            const newResults = [...old.results]

            const selectedOptionFilter = selectData?.find(filter => filter.value === selectedOption)
            if (selectedOptionFilter) {
                if (props.multiSelectUnique === true) {
                    const index = newResults.findIndex(v => v[tablePropsFn.crudOptions.primaryKey].toString() === selectedOptionFilter.value)
                    if (index === -1) {
                        newResults.push(selectedOptionFilter)
                    }
                } else {
                    newResults.push(selectedOptionFilter)
                }
            }

            return {
                results: newResults
            }
        })
    }

    const deleteFn = async (action: () => void, cell: CellContext<any, unknown>) => {
        await queryClient.setQueryData<QueryEagle<any>>(queryKey, (old) => {
            if (!old) {
                return {
                    results: []
                }
            }

            const newResults = [...old.results]
            newResults.splice(cell.row.index, 1)

            return {
                results: newResults
            }
        })
    }

    const tablePropsRes: TableProps<any> = {
        ...tablePropsFn,

        lazy: false,
        useQueryOptions: {
            refetchOnWindowFocus: false,
            ...tablePropsFn.useQueryOptions,
            queryKey: queryKey,
            staleTime: 0,
            initialDataUpdatedAt: 0,
        },

        crudOptions: {
            ...tablePropsFn.crudOptions,
            canRefresh: false,
            create: false,
            edit: false,
            delete: true,
            deleteFn,
        },
    } as TableProps<any>

    useEffect(() => {
        return () => {
            queryClient.setQueryData<QueryEagle<any>>(queryKey, () => ({ results: [] }))
        }
    }, [])

    return (
        <>
            <InputGroup className="mb-3">
                <Form.Select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    {
                        selectData?.map((option) => {
                            return (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            );
                        })
                    }
                </Form.Select >
                <Button onClick={addFn}>
                    {t('Add')}
                </Button>
            </InputGroup>

            <Table tableProps={tablePropsRes} />
        </>
    )
}