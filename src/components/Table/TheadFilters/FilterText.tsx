import React, { ChangeEvent } from "react"
import { Form } from "react-bootstrap"
import { Filter } from "@/index"

type Props = {
    headerId: string
    value?: string,
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>,
}

export const FilterText: React.FC<Props> = (props) => {
    return (
        <Form.Control
            id={`filter_${props.headerId}`}
            name={`filter_${props.headerId}`}
            type="text"
            value={props.value ?? ''}
            onChange={(e) => props.setValue(e.target.value)}
        />
    )
}