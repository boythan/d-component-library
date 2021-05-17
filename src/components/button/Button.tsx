import React, { ReactElement } from "react";
import ClassName from "classnames";
import { Input, Table } from "antd";

export interface ButtonProps {
    content: string;
}

export default function Button({ content }: ButtonProps): ReactElement {
    const buttonClass = ClassName("d-flex custom-button");
    return (
        <div className="">
            <button type="button" className={buttonClass}>
                {content}
            </button>
            <Input value="123" onChange={() => {}} />
        </div>
    );
}
