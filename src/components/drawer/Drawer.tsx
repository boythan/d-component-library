import React from "react";
import ClassNames from "classnames";
import { Drawer as DrawerAnt, DrawerProps } from "antd";
import Button from "../button/Button";

export interface IDrawerProps extends Omit<DrawerProps, "size"> {
    open: boolean;
    size?: "x-small" | "small" | "medium" | "large" | "x-large" | "auto";
    classNameButton?: string;
}

const DRAWER_WIDTH: Record<string, number> = {
    "x-small": 256,
    small: 320,
    medium: 384,
    large: 512,
    "x-large": 576,
};

const Drawer: React.FC<IDrawerProps> = ({
    children,
    open,
    onClose,
    size = "medium",
    closable = false,
    className,
    classNameButton,
    ...rest
}) => {
    const buttonClass = ClassNames(
        "absolute top-0 -left-[42px]",
        { hidden: !open },
        classNameButton
    );
    const computedWidth = size !== "auto" ? DRAWER_WIDTH[size] : undefined;

    return (
        <DrawerAnt
            open={open}
            onClose={(e) => onClose && onClose(e)}
            closable={closable}
            width={computedWidth}
            styles={{ wrapper: { overflow: "visible" }, body: { overflowY: "scroll" } }}
            {...rest}
            className={className}
        >
            <Button iconName="close" className={buttonClass} onClick={(e) => onClose && onClose(e)} />
            {children}
        </DrawerAnt>
    );
};

export default Drawer;
