/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { Resizable } from "react-resizable";
import "./ResizableTitle.css";

const ResizableTitle = (props: any) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    // Extract children to put inside Resizable
    const { children, style, ...thProps } = restProps;

    return (
        <th {...thProps} style={{ ...style, width }} className={restProps.className}>
            <Resizable
                width={width}
                height={0}
                handle={
                    <span
                        className="react-resizable-handle"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    />
                }
                onResize={onResize}
                draggableOpts={{ enableUserSelectHack: false }}
            >
                <div style={{ height: "100%", width: "100%" }}>{children}</div>
            </Resizable>
        </th>
    );
};

export default ResizableTitle;
