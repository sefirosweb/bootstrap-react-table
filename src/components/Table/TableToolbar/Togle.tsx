import React from "react";
import { Column } from "@tanstack/react-table";
import { Form } from "react-bootstrap";

type Props = {
    header: Column<any>
}

export const Togle: React.FC<Props> = (props) => {
    const { header } = props

    return (
        <Form.Check
            className="mx-3"
            type="checkbox"
            id={header.id}
            key={header.id}
            name={header.id}
            checked={header.getIsVisible()}
            label={header.id}
            onChange={header.getToggleVisibilityHandler()}
        />
    )
}