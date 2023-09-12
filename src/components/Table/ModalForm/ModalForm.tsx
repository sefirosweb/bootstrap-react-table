import React, { useState } from "react"
import { Modal } from "../../Modal"
import { ActionCrud, CrudOptions, FormDataType, MutationVars } from "../../../types"
import { CellContext, Table } from "@tanstack/react-table"
import { FormFields } from "./FormFields"
import { useMutation } from "@tanstack/react-query"
import { t } from "i18next"

type Props = {
    crudOptions: CrudOptions<any>,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    action: ActionCrud
    cell: CellContext<any, unknown> | null
    table: Table<any>
}

export const ModalForm: React.FC<Props> = (props) => {
    const { show, setShow, action, cell, table, crudOptions } = props

    const [formData, setFormData] = useState<FormDataType>({})
    const [isLoadingModal, setIsLoadingModal] = useState(false)

    const onOpenModal = () => {
        if (action === 'create') {
            const newFormData: FormDataType = {}

            table.getAllFlatColumns()
                .filter(column => column.columnDef.meta?.editable === true || column.id === props.crudOptions.primaryKey)
                .forEach(column => {
                    newFormData[column.id] = null
                })


            setFormData(newFormData)
        }

        if (action === 'edit') {
            const newFormData: FormDataType = {}
            if (cell)
                table.getAllFlatColumns()
                    .filter(column => column.columnDef.meta?.editable === true || column.id === crudOptions.primaryKey)
                    .forEach(column => {
                        newFormData[column.id] = cell.row.getAllCells().find(cell => cell.column.id === column.id)?.getValue() ?? null
                    })

            console.log({ newFormData })
            setFormData(newFormData)
        }

        if (action === 'delete') {
            const newFormData: FormDataType = {}
            if (cell)
                table.getAllFlatColumns()
                    .filter(column => column.columnDef.meta?.editable === true || column.id === crudOptions.primaryKey)
                    .forEach(column => {
                        newFormData[column.id] = cell.row.getAllCells().find(cell => cell.column.id === column.id)?.getValue() ?? null
                    })

            setFormData(newFormData)
        }
    }


    const submitMutation = async (mutationVars: MutationVars): Promise<any | null> => {
        const onSubmitFn = crudOptions.onSubmitFn
        if (!onSubmitFn) {
            console.error('onSubmitFn not defined')
            return
        }

        return onSubmitFn(mutationVars.formData, mutationVars.action)
    };

    const { mutate } = useMutation(submitMutation, {
        onSuccess: async (newValue, mutationVars) => {
            if (mutationVars.action === 'create') {
                // When is not lazy laod todo here
            }

            if (mutationVars.action === 'edit') {
                // When is not lazy laod todo here
            }

            if (mutationVars.action === 'delete') {
                // When is not lazy laod todo here
            }
        },
        onError: () => {
            console.log('error')
        },
    })

    const onSubmitForm = () => {
        mutate({ formData, action });
    }

    return (
        <>
            <Modal
                onShow={onOpenModal}
                show={show}
                setShow={setShow}
                title={action}
                accept={t('Accept')}
                handleAccept={onSubmitForm}
                body={
                    <>
                        {action === 'delete' && <div>Estas seguro de borrar??</div>}

                        {action !== 'delete' && table
                            .getAllFlatColumns()
                            .filter(column => column.columnDef.meta?.editable === true && column.id !== crudOptions.primaryKey)
                            .map(column => (
                                <FormFields key={column.id} column={column} formData={formData} setFormData={setFormData} isLoadingModal={isLoadingModal} />
                            ))}
                    </>
                }
            />
        </>

    )
}