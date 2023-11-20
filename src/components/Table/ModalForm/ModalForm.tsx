import React, { useContext, useState } from "react"
import { Modal } from "../../Modal"
import { ActionCrud, FormDataType, MutationVars, QueryEagle } from "../../../types"
import { CellContext, Table } from "@tanstack/react-table"
import { FormFields } from "./FormFields"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DateTime } from "luxon"
import { TableContext } from "../TableContext"
import { useTranslation } from "react-i18next"

type Props = {
    action: ActionCrud
    cell?: CellContext<any, unknown>
    table: Table<any>
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    isLoadingModal: boolean
}

export const ModalForm: React.FC<Props> = (props) => {
    const { action, cell, table, showModal, setShowModal, isLoadingModal } = props
    const { crudOptions, queryKey, isLazy } = useContext(TableContext)
    const { t } = useTranslation()

    const [formData, setFormData] = useState<FormDataType>({})

    const onOpenModal = () => {
        if (action === 'create') {
            const newFormData: FormDataType = {}

            table.getAllFlatColumns()
                .filter(column => column.columnDef.meta?.editable === true || column.id === crudOptions.primaryKey)
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

    const setValue = (columnId: string, newValue?: any) => {
        setFormData(
            (newFormData) => {
                newFormData[columnId] = newValue
                return newFormData
            }
        )
    }

    return (
        <>
            <Modal
                onShow={onOpenModal}
                show={showModal}
                setShow={setShowModal}
                title={action}
                accept={t('Accept')}
                handleAccept={onSubmitForm}
                isLoading={isLoadingModal}
                body={
                    <>
                        {action === 'delete' && <div>
                            {crudOptions.onDeleteModal && cell ?
                                crudOptions.onDeleteModal(cell) :
                                t('messages.confirm_delete')}
                        </div>}

                        {action !== 'delete' && table
                            .getAllLeafColumns()
                            .filter(column => column.columnDef.meta?.editable === true && column.id !== crudOptions.primaryKey)
                            .map(column => (
                                <FormFields
                                    key={column.id}
                                    column={column}
                                    value={formData[column.id]}
                                    setValue={(newValue) => setValue(column.id, newValue)}
                                    isLoadingModal={props.isLoadingModal}
                                    cellSelected={cell}
                                />
                            ))}
                    </>
                }
            />
        </>

    )
}