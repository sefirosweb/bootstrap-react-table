import React from "react"
import { FormMultiSelect as FormMultiSelectFw, Props } from "./FormMultiSelect"
import { QueryClientProvider } from "@tanstack/react-query"
import { useGetQueryClient } from "@/index"

export const FormMultiSelect: React.FC<Props> = (props) => {
    const queryClient = useGetQueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <FormMultiSelectFw {...props} />
        </QueryClientProvider >
    )
}