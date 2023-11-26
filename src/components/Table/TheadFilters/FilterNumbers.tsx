import { isEqual } from "lodash"
import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"

type CustomType = [number | null, number | null]

type Props = {
    headerId: string
    value?: CustomType,
    setValue: (newValue?: CustomType) => void,
}

const INITIAL_VALUE = (value?: CustomType): [string, string] => {
    if (!value) return ['', '']
    return [value[0]?.toString() ?? '', value[1]?.toString() ?? '']
}

export const FilterNumbers: React.FC<Props> = (props) => {
    const [values, setValues] = useState<[string, string]>(INITIAL_VALUE(props.value))

    useEffect(() => {
        if (props.value === undefined) {
            setValues(INITIAL_VALUE())
            return
        }

        const newFilters: [string, string] = [
            props.value[0]?.toString() ?? '',
            props.value[1]?.toString() ?? '',
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

            const min = parseFloat(newValue[0])
            const max = parseFloat(newValue[1])

            const newFilters: CustomType = [
                isNaN(min) ? null : min,
                isNaN(max) ? null : max,
            ]

            props.setValue(newFilters);
        }
    }

    return (
        <>
            <Form.Control
                id={`filter_${props.headerId}_min`}
                name={`filter_${props.headerId}_min`}
                placeholder="min"
                type="number"
                value={values[0]}
                onChange={(e) => onChange([e.target.value, values[1]])}
            />
            <Form.Control
                id={`filter_${props.headerId}_max`}
                name={`filter_${props.headerId}_max`}
                placeholder="max"
                type="number"
                className="mt-1"
                value={values[1]}
                onChange={(e) => onChange([values[0], e.target.value])}
            />
        </>
    )
}