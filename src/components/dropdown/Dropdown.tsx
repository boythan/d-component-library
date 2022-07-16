/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { CSSProperties, ElementRef, useEffect, useRef, useState } from "react";
import ClassNames from "classnames";
import Icon from "../elements/icon/Icon";
import Button, { ButtonProps } from "../button/Button";
import StringUtils from "../../utils/StringUtils";

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
    id?: string;
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
    style?: CSSProperties;
}

const MenuItem: React.FC<IMenuItemProps> = ({ item, Messages, onClick, isMainView, className, style, id }) => {
    const { id: idItem, iconName, subMenu, label, image } = item;
    const itemClass = ClassNames(
        "d-dropdown-menu__item",
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
        <li className={itemClass} onClick={() => onClick && onClick(item)} key={`${idItem}`} style={style} id={id}>
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
    const idContainer = useRef<string>(StringUtils.getUniqueID()).current;
    const idContent = useRef<string>(StringUtils.getUniqueID()).current;
    const containerClass = ClassNames(`d-dropdown`, className);
    const [contentPosition, setContentPosition] = useState<"right-edge" | "left-edge">();
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

    useEffect(() => {
        const dropdownContainer = document.getElementById(idContainer);
        const windowWidth = window.innerWidth;
        const marginLeft = dropdownContainer?.getBoundingClientRect()?.left ?? 0;
        const isLeftSide = marginLeft / windowWidth < 0.5;
        setContentPosition(isLeftSide ? "left-edge" : "right-edge");
    }, [window.innerWidth]);

    useEffect(() => {
        const dropdownContent = document.getElementById(idContent);
        const contentDimension = dropdownContent?.getBoundingClientRect();
        console.log({ contentDimension });
    }, [window.innerWidth]);

    const handleOnClickItem = (item: any) => {
        setOpenDropdown(false);
        return onClick && onClick(item);
    };

    let mainView: any = (
        <Button
            variant="trans"
            iconName="more_vert"
            {...buttonProps}
            onClick={() => setOpenDropdown(!openDropdown)}
            id={idContent}
        />
    );
    if (variant === "view") {
        mainView = value ? (
            <MenuItem
                item={value}
                Messages={Messages}
                onClick={() => setOpenDropdown(!openDropdown)}
                isMainView
                id={idContent}
            />
        ) : (
            <Button
                content={placeholder}
                {...buttonProps}
                onClick={() => setOpenDropdown(!openDropdown)}
                id={idContent}
            />
        );
    }
    if (children) {
        mainView = (
            <div onClick={() => setOpenDropdown(!openDropdown)} id={idContent}>
                {children}
            </div>
        );
    }

    return (
        <div className={containerClass} ref={wrapperRef} style={style} id={idContainer}>
            {mainView}
            {openDropdown && (
                <DropdownMenu
                    dataSource={dataSource}
                    onClick={handleOnClickItem}
                    Messages={Messages}
                    position={contentPosition}
                    {...rest}
                />
            )}
        </div>
    );
};

export default Dropdown;
