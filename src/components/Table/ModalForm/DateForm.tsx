import { DateTime } from "luxon";
import React, { ComponentProps } from "react"
import { Form } from "react-bootstrap"

type CustomProps = {
    value?: string | number,
    onOhange: (value: number) => void,
}

export type Props = CustomProps & Omit<ComponentProps<typeof Form.Control>, 'value' | 'onChange'>;

export const DateForm: React.FC<Props> = (props) => {
    let valueInt = 0
    if (typeof props.value === 'string') {
        valueInt = parseInt(props.value)
    } else if (typeof props.value === 'number') {
        valueInt = props.value
    } else {
        valueInt = 0
    }

    const date = DateTime.fromMillis(valueInt)

    return (
        <Form.Control
            type='date'
            value={date?.toISODate() ?? ''}
            onChange={(e) => {
                const newDate = DateTime.fromISO(e.target.value)
                props.onOhange(newDate.toMillis())
            }}
        />
    )
}