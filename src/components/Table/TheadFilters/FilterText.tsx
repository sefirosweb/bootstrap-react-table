import React, { ChangeEvent } from "react"
import { Form } from "react-bootstrap"
import { Filter } from "@/index"

type Props = {
    headerId: string
    tableFilters: Filter,
    setTableFilters: React.Dispatch<React.SetStateAction<Filter>>,
}

export const FilterText: React.FC<Props> = (props) => {
    const { headerId, tableFilters, setTableFilters } = props

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFilter = { ...tableFilters }
        if (e.target.value === '') {
            delete newFilter[headerId]
        } else {
            newFilter[headerId] = e.target.value
        }
        setTableFilters(newFilter)
    }

    return (
        <Form.Control
            id={`filter_${headerId}`}
            name={`filter_${headerId}`}
            type="text"
            value={tableFilters[headerId] ?? ''}
            onChange={onChange}
        />
    )
}