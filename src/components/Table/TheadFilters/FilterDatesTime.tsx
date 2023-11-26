import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { isEqual } from "lodash"

type CustomType = [string | null, string | null]

type Props = {
    headerId: string
    value?: CustomType,
    setValue: (newValue?: CustomType) => void,
}

const INITIAL_VALUE = (value?: CustomType): [string, string] => {
    if (!value) return ['', '']
    return [value[0] ?? '', value[1] ?? '']
}


export const FilterDatesTime: React.FC<Props> = (props) => {
    const [values, setValues] = useState<[string, string]>(INITIAL_VALUE(props.value))

    useEffect(() => {
        if (props.value === undefined) {
            setValues(INITIAL_VALUE())
            return
        }

        const newFilters: [string, string] = [
            props.value[0] ?? '',
            props.value[1] ?? '',
        ]

        if (isEqual(newFilters, values)) return
        setValues(newFilters)

    }, [props.value])

    const onChange = (newValue: [string, string]) => {

        setValues(newValue);
        if (props.setValue) {

            if (newValue[0] === '' && newValue[1] === '') {
                props.setValue(undefined)
                return
            }

            props.setValue(newValue);
        }
    }

    return (
        <>
            <Form.Control
                id={`filter_${props.headerId}_min`}
                name={`filter_${props.headerId}_min`}
                placeholder="min"
                type="datetime-local"
                value={values[0]}
                onChange={(e) => onChange([e.target.value, values[1]])}
            />
            <Form.Control
                id={`filter_${props.headerId}_max`}
                name={`filter_${props.headerId}_max`}
                placeholder="max"
                type="datetime-local"
                className="mt-1"
                value={values[1]}
                onChange={(e) => onChange([values[0], e.target.value])}
            />
        </>
    )
}