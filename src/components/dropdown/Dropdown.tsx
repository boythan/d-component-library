/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import ClassNames from "classnames";
import Icon from "../elements/icon/Icon";
import Button, { ButtonProps } from "../button/Button";

export interface IDropdownMenuItemProps {
    id: string | number;
    label: string;
    iconName?: string;
    image?: string;
    path?: string;
    title?: string;
    selected?: boolean;
    subMenu?: Array<IDropdownMenuItemProps>;
}

export interface IMenuItemProps {
    item: IDropdownMenuItemProps;
    Messages?: any;
    onClick?: (item: IDropdownMenuItemProps) => void;
    isMainView?: boolean;
    className?: string;
    style?: CSSProperties;
}

export interface DropDownMenuProps {
    dataSource: IDropdownMenuItemProps[];
    onClick?: (item: IDropdownMenuItemProps) => void;
    Messages?: any;
    className?: string;
    position?: "left-edge" | "right-edge";
    classNameMenuItem?: string;
    styleMenuItem?: CSSProperties;
}

export interface DropdownProps extends DropDownMenuProps {
    [key: string]: any;
    buttonProps?: ButtonProps;
    variant?: "button" | "view";
    value?: IDropdownMenuItemProps;
    placeholder?: string;
    className?: string;
    position?: "left-edge" | "right-edge";
    style?: CSSProperties;
}

const MenuItem: React.FC<IMenuItemProps> = ({ item, Messages, onClick, isMainView, className, style }) => {
    const { id, iconName, subMenu, label, image } = item;
    const itemClass = ClassNames(
        "d-dropdown-menu__item text-nowrap",
        {
            "d-dropdown-menu__item-with-submenu": subMenu && subMenu?.length > 0,
            "d-dropdown-menu__item-main-view": isMainView,
        },
        className
    );
    let iconImageView;
    const labelView = (
        <div className="w-100 text d-dropdown-menu__item-label">{Messages ? Messages[label] : label}</div>
    );
    let arrowView;
    if (iconName) {
        iconImageView = <Icon name={iconName} className="d-block mr-2" />;
    }
    if (image) {
        iconImageView = <img src={image} alt="" className="d-block image-square-x-small mr-2" />;
    }
    if (subMenu && subMenu?.length > 0) {
        arrowView = <Icon name="chevron_right" className="d-block" />;
    }
    if (isMainView) {
        arrowView = <Icon name="expand_more" className="d-block ml-2" />;
    }
    return (
        <li className={itemClass} onClick={() => onClick && onClick(item)} key={`${id}`} style={style}>
            {iconImageView}
            {labelView}
            {arrowView}
            {!isMainView && subMenu && subMenu.length > 0 && (
                <DropdownMenu dataSource={subMenu} onClick={(item) => console.log({ item })} />
            )}
        </li>
    );
};

export const DropdownMenu: React.FC<DropDownMenuProps> = ({
    dataSource = [],
    onClick = () => {},
    Messages,
    className,
    position,
    classNameMenuItem,
    styleMenuItem,
}) => {
    const wrapperClass = ClassNames(`d-dropdown-menu__container d-dropdown-menu__container-${position}`, className);
    const list = dataSource.map((item, index) => {
        return (
            <MenuItem
                item={item}
                onClick={onClick}
                Messages={Messages}
                className={classNameMenuItem}
                style={styleMenuItem}
            />
        );
    });

    return <ul className={wrapperClass}>{list}</ul>;
};

const Dropdown: React.FC<DropdownProps> = ({
    buttonProps = {},
    dataSource,
    onClick,
    variant = "button",
    value,
    Messages,
    placeholder = "Select...",
    className,
    position = "right-edge",
    style,
    children,
    ...rest
}) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const containerClass = ClassNames("d-dropdown  position-relative", className);

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const isClickOutside = wrapperRef.current && !wrapperRef.current.contains(event.target as HTMLElement);
            if (isClickOutside) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
    }, [wrapperRef, setOpenDropdown]);

    const handleOnClickItem = (item: any) => {
        setOpenDropdown(false);
        return onClick && onClick(item);
    };

    let mainView: any = (
        <Button variant="trans" iconName="more_vert" {...buttonProps} onClick={() => setOpenDropdown(!openDropdown)} />
    );
    if (variant === "view") {
        mainView = value ? (
            <MenuItem item={value} Messages={Messages} onClick={() => setOpenDropdown(!openDropdown)} isMainView />
        ) : (
            <Button content={placeholder} {...buttonProps} onClick={() => setOpenDropdown(!openDropdown)} />
        );
    }
    if (children) {
        mainView = <div onClick={() => setOpenDropdown(!openDropdown)}>{children}</div>;
    }

    return (
        <div className={containerClass} ref={wrapperRef} style={style}>
            {mainView}
            {openDropdown && (
                <DropdownMenu
                    dataSource={dataSource}
                    onClick={handleOnClickItem}
                    Messages={Messages}
                    position={position}
                    {...rest}
                />
            )}
        </div>
    );
};

export default Dropdown;
