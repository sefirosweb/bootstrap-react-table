import React, { ChangeEvent, useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { isEqual } from "lodash"

type Props = {
    headerId: string
    value?: string,
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>,
}

export const FilterText: React.FC<Props> = (props) => {
    const [value, setValue] = useState<string | undefined>(props?.value);

    useEffect(() => {
        if (isEqual(props.value, value)) return
        setValue(props.value)
    }, [props.value])

    const onChange = (newValue?: string) => {
        setValue(newValue);
        if (props.setValue) {
            props.setValue(newValue);
        }
    }

    return (
        <Form.Control
            id={`filter_${props.headerId}`}
            name={`filter_${props.headerId}`}
            type="text"
            value={props.value ?? ''}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}