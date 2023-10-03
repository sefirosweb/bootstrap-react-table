import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { Filter } from "@/index"
import { DateTime } from "luxon"

type Props = {
    headerId: string
    tableFilters: Filter,
    setTableFilters: React.Dispatch<React.SetStateAction<Filter>>,
}

export const FilterDates: React.FC<Props> = (props) => {
    const { headerId, tableFilters, setTableFilters } = props
    const [values, setValues] = useState<{ min: string, max: string }>({ min: '', max: '' })

    useEffect(() => {
        const newFilters = { ...tableFilters }

        if (values.min === '' && values.max === '') {
            delete newFilters[headerId]
            setTableFilters(newFilters)
            return
        }

        let min = values.min === '' ? null : DateTime.fromISO(values.min)
        let max = values.max === '' ? null : DateTime.fromISO(values.max)

        if (min !== null && max !== null) {
            if (min > max) {
                let temp = min
                min = max
                max = temp
            }
        }

        newFilters[headerId] = {
            min: min?.toISODate(),
            max: max?.toISODate(),
        }

        setTableFilters(newFilters)
    }, [values])


    return (
        <>
            <Form.Control
                id={`filter_${headerId}_min`}
                name={`filter_${headerId}_min`}
                placeholder="min"
                type="date"
                value={values.min}
                onChange={(e) => setValues({ ...values, min: e.target.value })}
            />

            <Form.Control
                id={`filter_${headerId}_max`}
                name={`filter_${headerId}_max`}
                placeholder="max"
                type="date"
                className="mt-1"
                value={values.max}
                onChange={(e) => setValues({ ...values, max: e.target.value })}
            />
        </>
    )
}