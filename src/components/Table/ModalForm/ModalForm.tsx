import React, { useState } from "react"
import { Modal } from "../../Modal"
import { ActionCrud, CrudOptions, FormDataType } from "../../../types"
import { CellContext, Table } from "@tanstack/react-table"
import { FormFields } from "./FormFields"

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
            setFormData({})
        }

        if (action === 'edit') {
            const newFormData: FormDataType = {}

            table.getAllFlatColumns()
                .filter(column => column.columnDef.meta?.editable === true || column.id === crudOptions.primaryKey)
                .forEach(column => {
                    if (cell) {
                        newFormData[column.id] = cell.row.original[column.id] ?? ''
                    }
                })

            setFormData(newFormData)
        }

        if (action === 'delete') {
            const newFormData: FormDataType = {}
            table.getAllFlatColumns()
                .filter(column => column.columnDef.meta?.editable === true || column.id === props.crudOptions.primaryKey)
                .forEach(column => {
                    if (cell) {
                        formData[column.id] = cell.row.original[column.id] ?? ''
                    }
                })
            setFormData(newFormData)
        }
    }

    return (
        <>
            <Modal
                onShow={onOpenModal}
                show={show}
                setShow={setShow}
                title={action}
                body={
                    <>
                        {action === 'delete' && <div>Estas seguro de borrar??</div>}

                        {action !== 'delete' && table
                            .getAllFlatColumns()
                            .filter(column => column.columnDef.meta?.editable === true && column.id !== props.crudOptions.primaryKey)
                            .map(column => (
                                <FormFields key={column.id} column={column} formData={formData} setFormData={setFormData} isLoadingModal={isLoadingModal} />
                            ))}
                    </>
                }
            />
        </>

    )
}