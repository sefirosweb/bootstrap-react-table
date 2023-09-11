import React from "react"
import { FormSelect as FormSelectFw, Props } from "./FormSelect"
import { QueryClientProvider } from "@tanstack/react-query"
import { useGetQueryClient } from "@/index"

export const FormSelect: React.FC<Props> = (props) => {
    const queryClient = useGetQueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <FormSelectFw {...props} />
        </QueryClientProvider >
    )
}