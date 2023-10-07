import React from "react";
import { Column } from "@tanstack/react-table";
import { Form } from "react-bootstrap";

type Props = {
    column: Column<any>
}

export const Togle: React.FC<Props> = (props) => {
    const { column } = props

    return (
        <Form.Check
            className="mx-3"
            type="checkbox"
            id={column.id}
            key={column.id}
            name={column.id}
            checked={column.getIsVisible()}
            label={typeof column.columnDef.header === "string" ? column.columnDef.header : column.id}
            onChange={column.getToggleVisibilityHandler()}
        />
    )
}