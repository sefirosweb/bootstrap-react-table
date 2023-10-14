import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { isEqual } from "lodash"

type CustomType = [string | null, string | null]

type Props = {
    headerId: string
    value?: CustomType,
    setValue: (newValue?: CustomType) => void,
}

const INITIAL_VALUE: [string, string] = ['', '']

export const FilterDatesTime: React.FC<Props> = (props) => {
    const { headerId, value, setValue } = props
    const [values, setValues] = useState<[string, string]>(INITIAL_VALUE)

    useEffect(() => {
        if (!value) {
            if (!isEqual(values, INITIAL_VALUE)) {
                setValues(INITIAL_VALUE)
            }
            return
        }

        const newFilters: [string, string] = [
            value[0] ?? '',
            value[1] ?? '',
        ]

        if (isEqual(newFilters, values)) return
        setValues(newFilters)

    }, [value])

    useEffect(() => {
        if (values[0] === '' && values[1] === '') {
            setValue(undefined)
            return
        }

        const newFilters: CustomType = [
            values[0] === '' ? null : values[0],
            values[1] === '' ? null : values[1]
        ]

        if (isEqual(newFilters, value)) return
        setValue(newFilters)
    }, [values])

    return (
        <>
            <Form.Control
                id={`filter_${headerId}_min`}
                name={`filter_${headerId}_min`}
                placeholder="min"
                type="datetime-local"
                value={values[0]}
                onChange={(e) => setValues([e.target.value, values[1]])}
            />
            <Form.Control
                id={`filter_${headerId}_max`}
                name={`filter_${headerId}_max`}
                placeholder="max"
                type="datetime-local"
                className="mt-1"
                value={values[1]}
                onChange={(e) => setValues([values[0], e.target.value])}
            />
        </>
    )
}