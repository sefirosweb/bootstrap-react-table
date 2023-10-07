import { flexRender, Header } from "@tanstack/react-table"
import { FormDataType } from "@/index"
import { Form } from "react-bootstrap"
import { FormSelect } from "@/components/FormSelect"

type Props = {
    header: Header<any, unknown>,
    isLoadingModal: boolean,
    formData: FormDataType,
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>,
}

export const FormFields: React.FC<Props> = (props) => {
    const { header, formData, setFormData, isLoadingModal } = props

    return (
        <Form.Group className="mb-3" controlId={`form_${header.id}`}>
            <Form.Label>
                {flexRender(header.column.columnDef.header, header.getContext())}
            </Form.Label>


            {(header.column.columnDef.meta?.type === undefined || header.column.columnDef.meta.type === 'text') && (
                <Form.Control
                    type="text"
                    value={formData[header.id] ?? ''}
                    onChange={(e) => {
                        const newFormData = { ...formData }
                        newFormData[header.id] = e.target.value
                        setFormData(newFormData)
                    }}
                />
            )}

            {header.column.columnDef.meta?.type === 'number' && (
                <Form.Control
                    type="number"
                    value={formData[header.id] ?? ''}
                    onChange={(e) => {
                        const newFormData = { ...formData }
                        newFormData[header.id] = e.target.value
                        setFormData(newFormData)
                    }}
                />
            )}

            {header.column.columnDef.meta?.type === 'date' && (
                <Form.Control
                    value={formData[header.id] ?? ''}
                    onChange={(e) => {
                        const newFormData = { ...formData }
                        newFormData[header.id] = e.target.value
                        setFormData(newFormData)
                    }}
                    type='date'
                />
            )}

            {header.column.columnDef.meta?.type === 'datetime' && (
                <Form.Control
                    value={formData[header.id] ?? ''}
                    onChange={(e) => {
                        const newFormData = { ...formData }
                        newFormData[header.id] = e.target.value
                        setFormData(newFormData)
                    }}
                    type='datetime-local'
                />
            )}

            {header.column.columnDef.meta?.type === 'select' && (
                <FormSelect
                    value={formData[header.id] ?? ''}
                    useQueryOptions={header.column.columnDef.meta.useQueryOptions}
                    addNullOption={header.column.columnDef.meta.addNullOption}
                    handleChange={(selectedOption) => {
                        const newFormData = { ...formData }
                        newFormData[header.id] = selectedOption?.value ?? null
                        setFormData(newFormData)
                    }}
                />
            )}

        </Form.Group>
    )
}