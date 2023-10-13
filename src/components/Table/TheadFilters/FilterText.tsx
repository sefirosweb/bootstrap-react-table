import React, { ChangeEvent } from "react"
import { Form } from "react-bootstrap"
import { Filter } from "@/index"

type Props = {
    headerId: string
    value?: string,
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>,
}

export const FilterText: React.FC<Props> = (props) => {
    const { headerId, value, setValue } = props

    return (
        <Form.Control
            id={`filter_${headerId}`}
            name={`filter_${headerId}`}
            type="text"
            value={value ?? ''}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}