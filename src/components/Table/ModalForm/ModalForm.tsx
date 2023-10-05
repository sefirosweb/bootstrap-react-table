import React, { useState } from "react"
import { Modal } from "../../Modal"
import { ActionCrud, CrudOptions, FormDataType, MutationVars, QueryEagle, QueryPage } from "../../../types"
import { CellContext, Column, ColumnDef, Table } from "@tanstack/react-table"
import { FormFields } from "./FormFields"
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query"
import { t } from "i18next"
import { DateTime } from "luxon"

type Props = {
    crudOptions: CrudOptions<any>,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    action: ActionCrud
    cell: CellContext<any, unknown> | null
    table: Table<any>
    isLoadingModal: boolean
    queryKey: QueryKey
    isLazy: boolean,
}

export const ModalForm: React.FC<Props> = (props) => {
    const { action, cell, table, crudOptions, queryKey, isLazy } = props

    const [formData, setFormData] = useState<FormDataType>({})

    const onOpenModal = () => {
        if (action === 'create') {
            const newFormData: FormDataType = {}

            table.getAllFlatColumns()
                .filter(column => column.columnDef.meta?.editable === true || column.id === props.crudOptions.primaryKey)
                .forEach(column => {
                    newFormData[column.id] = null
                })


            setFormData(newFormData)
        } else {
            const newFormData: FormDataType = {}
            if (cell) {
                const cells = cell.row.getAllCells()
                table.getAllFlatColumns()
                    .filter(column => column.columnDef.meta?.editable === true || column.id === crudOptions.primaryKey)
                    .forEach(column => {
                        let value = cells.find(cell => cell.column.id === column.id)?.getValue<string>() ?? null

                        if (value && column.columnDef.meta?.type === 'datetime') {
                            value = DateTime.fromISO(value).toFormat("yyyy-MM-dd'T'HH:mm:ss")
                        }

                        if (value && column.columnDef.meta?.type === 'date') {
                            value = DateTime.fromISO(value).toISODate()
                        }

                        newFormData[column.id] = value
                    })
            }
            setFormData(newFormData)
        }
    }


    const queryClient = useQueryClient()

    const submitMutation = async (mutationVars: MutationVars): Promise<any | null> => {
        const onSubmitFn = crudOptions.onSubmitFn
        if (!onSubmitFn) {
            console.error('onSubmitFn not defined')
            return
        }

        return onSubmitFn(mutationVars.formData, mutationVars.action)
    };

    const { mutate } = useMutation({
        mutationFn: submitMutation,
        onSuccess: async (newValue, mutationVars) => {
            if (isLazy) return
            if (!newValue) return

            if (mutationVars.action === 'create') {
                await queryClient.setQueryData<QueryEagle<any>>(queryKey, (old) => {
                    if (!old) {
                        return {
                            results: [newValue]
                        }
                    }

                    return {
                        ...old,
                        results: [...old.results, newValue]
                    }
                })
            }

            if (mutationVars.action === 'edit') {
                await queryClient.setQueryData<QueryEagle<any>>(queryKey, (old) => {
                    if (!old) return {
                        results: [newValue]
                    }

                    const newRows = structuredClone(old)
                    const findIndex = newRows.results.findIndex((row) => row[crudOptions.primaryKey] === newValue[crudOptions.primaryKey])
                    if (newRows && findIndex !== undefined && findIndex >= 0) {
                        newRows.results.splice(findIndex, 1, newValue)
                    }

                    return {
                        ...newRows
                    }
                })
            }

            if (mutationVars.action === 'delete') {
                await queryClient.setQueryData<QueryEagle<any>>(queryKey, (old) => {
                    if (!old) return {
                        results: []
                    }

                    const newRows = structuredClone(old)
                    const findIndex = newRows.results.findIndex((row) => row[crudOptions.primaryKey] === newValue)
                    if (findIndex !== undefined && findIndex >= 0) {
                        newRows.results.splice(findIndex, 1)
                    }


                    return {
                        ...newRows
                    }
                })
            }
        },
        onError: (error) => {
            console.error(error)
        },
    })

    const onSubmitForm = () => {
        mutate({ formData, action });
    }

    return (
        <>
            <Modal
                onShow={onOpenModal}
                show={props.showModal}
                setShow={props.setShowModal}
                title={action}
                accept={t('Accept')}
                handleAccept={onSubmitForm}
                isLoading={props.isLoadingModal}
                body={
                    <>
                        {action === 'delete' && <div>Estas seguro de borrar??</div>}

                        {action !== 'delete' && table
                            .getAllFlatColumns()
                            .filter(column => column.columnDef.meta?.editable === true && column.id !== crudOptions.primaryKey)
                            .map(column => (
                                <FormFields key={column.id} column={column} formData={formData} setFormData={setFormData} isLoadingModal={props.isLoadingModal} />
                            ))}
                    </>
                }
            />
        </>

    )
}