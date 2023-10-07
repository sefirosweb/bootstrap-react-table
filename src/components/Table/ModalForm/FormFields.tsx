import { Column } from "@tanstack/react-table"
import { FormDataType } from "@/index"
import { Form } from "react-bootstrap"
import { FormSelect } from "@/components/FormSelect"

type Props = {
    column: Column<any>,
    isLoadingModal: boolean,
    formData: FormDataType,
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>,
}

export const FormFields: React.FC<Props> = (props) => {
    const { column, formData, setFormData, isLoadingModal } = props

    return (
        <Form.Group className="mb-3" controlId={`form_${column.id}`}>
            <Form.Label>
                {typeof column.columnDef.header === "string" ? column.columnDef.header : column.id}
            </Form.Label>


            {(column.columnDef.meta?.type === undefined || column.columnDef.meta.type === 'text') && (
                <Form.Control
                    type="text"
                    disabled={isLoadingModal}
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
                    disabled={isLoadingModal}
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
                    type='date'
                    disabled={isLoadingModal}
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
                    type='datetime-local'
                    disabled={isLoadingModal}
                    value={formData[column.id] ?? ''}
                    onChange={(e) => {
                        const newFormData = { ...formData }
                        newFormData[column.id] = e.target.value
                        setFormData(newFormData)
                    }}
                />
            )}

            {column.columnDef.meta?.type === 'select' && (
                <FormSelect

                    value={formData[column.id] ?? ''}
                    useQueryOptions={column.columnDef.meta.useQueryOptions}
                    addNullOption={column.columnDef.meta.addNullOption}
                    handleChange={(selectedOption) => {
                        const newFormData = { ...formData }
                        newFormData[column.id] = selectedOption?.value ?? null
                        setFormData(newFormData)
                    }}
                />
            )}

        </Form.Group>
    )
}