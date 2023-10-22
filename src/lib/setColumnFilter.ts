import { ColumnFilter } from "@tanstack/react-table"
import { isEqual } from "lodash"
import { PageOptions } from "@/types"

export const setColumnFilter = (name: string, value: any | undefined, pageOptions: PageOptions) => {
    const newPageOptions = structuredClone(pageOptions)
    const oldColumFilters = newPageOptions.columnFilters?.find(f => f.id === name)

    const newColumnFilters: ColumnFilter | undefined = value === undefined ? undefined : {
        id: name,
        value: value
    }

    if (isEqual(oldColumFilters, newColumnFilters)) {
        return newPageOptions
    }

    if (!newPageOptions.columnFilters) {
        newPageOptions.columnFilters = []
    }

    if (!newColumnFilters) {
        const index = newPageOptions.columnFilters.findIndex(f => f.id === name)
        if (index > -1) {
            newPageOptions.columnFilters.splice(index, 1)
        }

        return newPageOptions
    }

    if (!oldColumFilters) {
        newPageOptions.columnFilters.push(newColumnFilters)
    } else {
        oldColumFilters.value = newColumnFilters.value
    }

    return newPageOptions
}
