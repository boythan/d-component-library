import React from "react";
import ClassNames from "classnames";
import { Drawer as DrawerAnt, DrawerProps } from "antd";
import Button from "../button/Button";

export interface IDrawerProps extends DrawerProps {
    open: boolean;
    size?: "x-small" | "small" | "medium" | "large" | "x-large" | "auto";
}

const Drawer: React.FC<IDrawerProps> = ({ children, open, onClose, size = "medium", closable = false, ...rest }) => {
    const buttonClass = ClassNames("d-drawer__close-button", { "d-none": !open });
    const drawerClass = ClassNames(`d-drawer__container d-drawer__${size}`);
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
