import { CellContext, Column } from "@tanstack/react-table"
import { FormDataType } from "@/index"
import { Form } from "react-bootstrap"
import { FormSelect } from "@/components/FormSelect"
import { FormMultiSelect } from "@/components/FormMultiSelect"

type Props = {
    column: Column<any>,
    isLoadingModal: boolean,
    formData: FormDataType,
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>,
    cellSelected?: CellContext<any, unknown>
}

export const FormFields: React.FC<Props> = (props) => {
    const { column, formData, setFormData, isLoadingModal, cellSelected } = props

    const value = formData[column.id]
    const setValue = (newValue?: any) => {
        const newFormData = { ...formData }
        newFormData[column.id] = newValue
        setFormData(newFormData)
    }

    if (column.columnDef.meta?.customForm) {
        const CustomForm = column.columnDef.meta.customForm
        return <CustomForm column={column} value={value} setValue={setValue} />
    }

    return (
        <Form.Group className="mb-3" controlId={`form_${column.id}`}>
            <Form.Label>
                {typeof column.columnDef.header === "string" ? column.columnDef.header : column.id}
            </Form.Label>


            {(column.columnDef.meta?.type === undefined || column.columnDef.meta.type === 'text') && (
                <Form.Control
                    type="text"
                    disabled={isLoadingModal}
                    value={value ?? ''}
                    onChange={(e) => setValue(e.target.value)}
                />
            )}

            {column.columnDef.meta?.type === 'number' && (
                <Form.Control
                    type="number"
                    disabled={isLoadingModal}
                    value={value ?? ''}
                    onChange={(e) => setValue(e.target.value)}
                />
            )}

            {column.columnDef.meta?.type === 'date' && (
                <Form.Control
                    type='date'
                    disabled={isLoadingModal}
                    value={value ?? ''}
                    onChange={(e) => setValue(e.target.value)}
                />
            )}

            {column.columnDef.meta?.type === 'datetime' && (
                <Form.Control
                    type='datetime-local'
                    disabled={isLoadingModal}
                    value={value ?? ''}
                    onChange={(e) => setValue(e.target.value)}
                />
            )}

            {column.columnDef.meta?.type === 'select' && (
                <FormSelect
                    value={value ?? ''}
                    useQueryOptions={column.columnDef.meta.useQueryOptions}
                    addNullOption={column.columnDef.meta.addNullOption}
                    handleChange={(value) => setValue(value?.value ?? null)}
                />
            )}

            {column.columnDef.meta?.type === 'multiselect' && (
                <FormMultiSelect
                    useQueryOptions={column.columnDef.meta.useQueryOptions}
                    tableProps={column.columnDef.meta.tableProps}
                    cellSelected={cellSelected}
                    multiSelectUnique={column.columnDef.meta.multiSelectUnique}
                    handleChange={(value) => setValue(value)}
                />
            )}

        </Form.Group>
    )
}