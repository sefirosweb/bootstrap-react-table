import { isEqual } from "lodash"
import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"

type CustomType = [number | null, number | null]

type Props = {
    headerId: string
    value?: CustomType,
    setValue: (newValue?: CustomType) => void,
}

const INITIAL_VALUE: [string, string] = ['', '']

export const FilterNumbers: React.FC<Props> = (props) => {
    const [values, setValues] = useState<[string, string]>(INITIAL_VALUE)

    useEffect(() => {
        if (!props.value) {
            if (!isEqual(values, INITIAL_VALUE)) {
                setValues(INITIAL_VALUE)
            }
            return
        }

        const newFilters: [string, string] = [
            props.value[0]?.toString() ?? '',
            props.value[1]?.toString() ?? '',
        ]

        if (isEqual(newFilters, values)) return
        setValues(newFilters)

    }, [props.value])

    useEffect(() => {
        if (values[0] === '' && values[1] === '') {
            props.setValue(undefined)
            return
        }

        let min = parseFloat(values[0])
        let max = parseFloat(values[1])

        const newFilters: CustomType = [
            isNaN(min) ? null : min,
            isNaN(max) ? null : max,
        ]

        if (isEqual(newFilters, props.value)) return
        props.setValue(newFilters)
    }, [values])


    return (
        <>
            <Form.Control
                id={`filter_${props.headerId}_min`}
                name={`filter_${props.headerId}_min`}
                placeholder="min"
                type="number"
                value={values[0]}
                onChange={(e) => setValues([e.target.value, values[1]])}
            />
            <Form.Control
                id={`filter_${props.headerId}_max`}
                name={`filter_${props.headerId}_max`}
                placeholder="max"
                type="number"
                className="mt-1"
                value={values[1]}
                onChange={(e) => setValues([values[0], e.target.value])}
            />
        </>
    )
}