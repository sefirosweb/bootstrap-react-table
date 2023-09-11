import { Column, flexRender } from "@tanstack/react-table"
import { FormDataType } from "../../../types"
import { Form } from "react-bootstrap"

type Props = {
    column: Column<any>,
    isLoadingModal: boolean,
    formData: FormDataType,
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>,
}

export const FormFields: React.FC<Props> = (props) => {
    const { column, formData, setFormData, isLoadingModal } = props
    const label = typeof column.columnDef.header === 'function' ? column.id : column.columnDef.header

    return (
        <Form.Group className="mb-3" controlId={`form_${column.id}`}>
            <Form.Label>
                {column.id}
                {/* {flexRender(column.columnDef.header)} */}
            </Form.Label>


            {(column.columnDef.meta?.type === undefined || column.columnDef.meta.type === 'text') && (
                <Form.Control
                    type="text"
                    value={formData[column.id] ?? ''}
                    onChange={(e) => {
                        const newFormData = { ...formData }
                        newFormData[column.id] = e.target.value
                        setFormData(newFormData)
                    }}
                />
            )}

            {column.columnDef.meta?.type === 'number' && (
                <Form.Control
                    type="number"
                    value={formData[column.id] ?? ''}
                    onChange={(e) => {
                        const newFormData = { ...formData }
                        newFormData[column.id] = e.target.value
                        setFormData(newFormData)
                    }}
                />
            )}

            {column.columnDef.meta?.type === 'date' && (
                <Form.Control
                    type="date"
                    value={formData[column.id] ?? ''}
                    onChange={(e) => {
                        const newFormData = { ...formData }
                        newFormData[column.id] = e.target.value
                        setFormData(newFormData)
                    }}
                />
            )}

            {column.columnDef.meta?.type === 'datetime' && (
                <Form.Control
                    type="datetime-local"
                    value={formData[column.id] ?? ''}
                    onChange={(e) => {
                        const newFormData = { ...formData }
                        newFormData[column.id] = e.target.value
                        setFormData(newFormData)
                    }}
                />
            )}






        </Form.Group>
    )
}