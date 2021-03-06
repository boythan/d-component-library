import React from "react";
import ClassNames from "classnames";
import { Drawer as DrawerAnt, DrawerProps } from "antd";
import Button from "../button/Button";

export interface IDrawerProps extends Omit<DrawerProps, "size"> {
    open: boolean;
    size?: "x-small" | "small" | "medium" | "large" | "x-large" | "auto";
    classNameButton?: string;
}

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
    const buttonClass = ClassNames("d-drawer__close-button", { "d-none": !open }, classNameButton);
    const drawerClass = ClassNames(`d-drawer__container d-drawer__${size} ${className}`);
    return (
        <DrawerAnt
            visible={open}
            onClose={(e) => onClose && onClose(e)}
            closable={closable}
            {...rest}
            className={drawerClass}
        >
            <Button iconName="close" className={buttonClass} onClick={(e) => onClose && onClose(e)} />
            {children}
        </DrawerAnt>
    );
};

export default Drawer;
