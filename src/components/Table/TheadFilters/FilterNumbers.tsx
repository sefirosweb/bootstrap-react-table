import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { Filter } from "@/index"

type Props = {
    headerId: string
    tableFilters: Filter,
    setTableFilters: React.Dispatch<React.SetStateAction<Filter>>,
}

export const FilterNumbers: React.FC<Props> = (props) => {
    const { headerId, tableFilters, setTableFilters } = props
    const [values, setValues] = useState<{ min: string, max: string }>({ min: '', max: '' })

    useEffect(() => {
        const newFilters = { ...tableFilters }

        if (values.min === '' && values.max === '') {
            delete newFilters[headerId]
            setTableFilters(newFilters)
            return
        }

        let min = parseFloat(values.min)
        let max = parseFloat(values.max)


        if (!isNaN(min) && !isNaN(max) && min > max) {
            let temp = min
            min = max
            max = temp
        }

        newFilters[headerId] = {
            min: isNaN(min) ? null : min,
            max: isNaN(max) ? null : max,
        }

        setTableFilters(newFilters)
    }, [values])


    return (
        <>
            <Form.Control
                id={`filter_${headerId}_min`}
                name={`filter_${headerId}_min`}
                placeholder="min"
                type="number"
                value={values.min}
                onChange={(e) => setValues({ ...values, min: e.target.value })}
            />
            <Form.Control
                id={`filter_${headerId}_max`}
                name={`filter_${headerId}_max`}
                placeholder="max"
                type="number"
                className="mt-1"
                value={values.max}
                onChange={(e) => setValues({ ...values, max: e.target.value })}
            />
        </>
    )
}