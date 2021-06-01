/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useRef, useState } from "react";
import ClassNames from "classnames";
import Icon from "../icon/Icon";
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
    [key: string]: any;
}

export interface DropDownMenuProps {
    [key: string]: any;
    dataSource: IDropdownMenuItemProps[];
    onClick?: (item: IDropdownMenuItemProps) => void;
    Messages?: any;
    className?: string;
}

export interface DropdownProps extends DropDownMenuProps {
    [key: string]: any;
    buttonProps?: ButtonProps;
    variant?: "button" | "view";
    value?: IDropdownMenuItemProps;
    placeholder?: string;
    className?: string;
    classNameMenu?: string;
}

const MenuItem = ({
    item,
    Messages,
    onClick,
    isMainView,
}: {
    item: IDropdownMenuItemProps;
    Messages?: any;
    onClick?: (item: IDropdownMenuItemProps) => void;
    isMainView?: boolean;
}) => {
    const { id, iconName, subMenu, label, image } = item;
    const itemClass = ClassNames("d-dropdown-menu__item ", {
        "d-dropdown-menu__item-with-submenu": subMenu && subMenu?.length > 0,
        "d-dropdown-menu__item-main-view": isMainView,
    });
    let iconImageView;
    const labelView = <div className="text w-100">{Messages ? Messages[label] : label}</div>;
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
        <li className={itemClass} onClick={() => onClick && onClick(item)} key={`${id}`}>
            {iconImageView}
            {labelView}
            {arrowView}
            {!isMainView && subMenu && subMenu.length > 0 && <DropdownMenu dataSource={subMenu} />}
        </li>
    );
};

export const DropdownMenu: React.FC<DropDownMenuProps> = ({
    dataSource = [],
    onClick = () => {},
    Messages,
    className,
}) => {
    const wrapperClass = ClassNames("d-dropdown-menu__container p-0", className);
    const list = dataSource.map((item, index) => {
        return <MenuItem item={item} onClick={onClick} Messages={Messages} />;
    });

    return <ul className={wrapperClass}>{list}</ul>;
};

const Dropdown: React.FC<DropdownProps> = ({
    buttonProps = { variant: "trans", iconName: "more_vert" },
    dataSource,
    onClick,
    variant = "button",
    value,
    Messages,
    placeholder = "Select...",
    className,
    classNameMenu,
}) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const containerClass = ClassNames("d-dropdown positon-relative", className);
    const dropdownClass = ClassNames("d-dropdown__menu", { "d-dropdown__menu-open": openDropdown });

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

    const getLabelValue = (value: IDropdownMenuItemProps) => {
        return Messages ? Messages[value?.label] : value?.label;
    };
    let mainView: any = () => <Button {...buttonProps} onClick={() => setOpenDropdown(!openDropdown)} />;
    if (variant === "view") {
        mainView = () => {
            if (!value) {
                return <Button content={placeholder} onClick={() => setOpenDropdown(!openDropdown)} />;
            }
            return (
                <MenuItem item={value} Messages={Messages} onClick={() => setOpenDropdown(!openDropdown)} isMainView />
            );
        };
    }
    return (
        <div className={containerClass} ref={wrapperRef}>
            {mainView()}
            <div className={dropdownClass}>
                <DropdownMenu dataSource={dataSource} onClick={handleOnClickItem} Messages={Messages} />
            </div>
        </div>
    );
};

export default Dropdown;
