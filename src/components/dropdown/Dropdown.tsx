/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { CSSProperties, ElementRef, useEffect, useMemo, useRef, useState } from "react";
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

export interface IMenuItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "onClick"> {
    item: IDropdownMenuItemProps;
    Messages?: any;
    onClick?: (item: IDropdownMenuItemProps) => void;
    isMainView?: boolean;
    className?: string;
    style?: CSSProperties;
    id?: string;
}

export interface DropDownMenuProps extends Omit<React.LiHTMLAttributes<HTMLUListElement>, "onClick" | "value"> {
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
    activeOnHover?: boolean;
}

const MenuItem: React.FC<IMenuItemProps> = ({ item, Messages, onClick, isMainView, className, style, ...rest }) => {
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
        <li className={itemClass} onClick={() => onClick && onClick(item)} key={`${idItem}`} style={style} {...rest}>
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
    ...rest
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

    return (
        <ul className={wrapperClass} {...rest}>
            {list}
        </ul>
    );
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
    style,
    children,
    activeOnHover,
    ...rest
}) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const idContainer = useRef<string>(StringUtils.getUniqueID()).current;
    const idContent = useRef<string>(StringUtils.getUniqueID()).current;
    const idDropdown = useRef<string>(StringUtils.getUniqueID()).current;
    const containerClass = ClassNames(`d-dropdown`, className);
    const [contentHorizontalPosition, setContentHorizontalPosition] = useState<"right-edge" | "left-edge">();
    const [contentVerticalPosition, setContentVerticalPosition] = useState<"top-edge" | "bottom-edge">();
    const [contentDimension, setContentDimension] = useState<DOMRect>();
    const [dropdownMenuDimension, setDropdownMenuDimension] = useState<DOMRect>();
    const wrapperRef = useRef<HTMLDivElement>(null);

    const dropDownMenuPosition = useMemo<CSSProperties | undefined>(() => {
        if (!contentDimension || !dropdownMenuDimension) {
            return undefined;
        }
        const isLeftEdge = contentHorizontalPosition === "left-edge";
        const isRightEdge = contentHorizontalPosition === "right-edge";
        const isBottomEdge = contentVerticalPosition === "bottom-edge";
        const { top = 0, left, right, bottom, height = 0, width, x, y } = contentDimension || {};
        if (isBottomEdge) {
            return {
                top: `${top - dropdownMenuDimension?.height}px`,
                left: isLeftEdge ? `${left}px` : `${right}px`,
                transform: isRightEdge ? `translate(-${dropdownMenuDimension?.width}px,0px)` : "none",
            };
        }
        return {
            top: `${top + height}px`,
            left: isLeftEdge ? `${left}px` : `${right}px`,
            transform: isRightEdge ? `translate(-${dropdownMenuDimension?.width}px,0px)` : "none",
        };
    }, [contentDimension, contentHorizontalPosition, contentVerticalPosition, dropdownMenuDimension]);

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
        const windowHeight = window.innerHeight;
        const marginLeft = dropdownContainer?.getBoundingClientRect()?.left ?? 0;
        const marginBottom = dropdownContainer?.getBoundingClientRect()?.top ?? 0;
        const isLeftSide = marginLeft / windowWidth < 0.5;
        const isBottomSie = marginBottom / windowHeight > 0.65;
        setContentHorizontalPosition(isLeftSide ? "left-edge" : "right-edge");
        setContentVerticalPosition(isBottomSie ? "bottom-edge" : "top-edge");
    }, [window.innerWidth, openDropdown, idContainer]);

    useEffect(() => {
        const dropdownContent = document.getElementById(idContent);
        const contentDimension = dropdownContent?.getBoundingClientRect();
        setContentDimension(contentDimension);
    }, [window.innerWidth, openDropdown, idContent]);

    useEffect(() => {
        const dropdownMenu = document.getElementById(idDropdown);
        const dropdownMenuDimension = dropdownMenu?.getBoundingClientRect();
        setDropdownMenuDimension(dropdownMenuDimension);
    }, [window.innerWidth, openDropdown, idDropdown]);

    const handleOnClickItem = (item: any) => {
        setOpenDropdown(false);
        return onClick && onClick(item);
    };

    const onMouseEnterHandler = () => {
        if (activeOnHover) {
            return setOpenDropdown(true);
        }
        return null;
    };

    const onMouseLeaveHandler = () => {
        if (activeOnHover) {
            return setOpenDropdown(false);
        }
        return null;
    };

    const onClickHandler = () => {
        if (activeOnHover) {
            return null;
        }
        return setOpenDropdown(!openDropdown);
    };
    let mainView: any = (
        <Button
            variant="trans"
            iconName="more_vert"
            {...buttonProps}
            onClick={onClickHandler}
            id={idContent}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
        />
    );
    if (variant === "view") {
        mainView = value ? (
            <MenuItem
                item={value}
                Messages={Messages}
                onClick={onClickHandler}
                isMainView
                id={idContent}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
            />
        ) : (
            <Button
                content={placeholder}
                {...buttonProps}
                onClick={onClickHandler}
                id={idContent}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
            />
        );
    }
    if (children) {
        mainView = (
            <div
                onClick={onClickHandler}
                id={idContent}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
            >
                {children}
            </div>
        );
    }

    return (
        <div className={containerClass} ref={wrapperRef} style={style} id={idContainer}>
            {mainView}
            {openDropdown && (
                <div className="d-dropdown__overlay">
                    <DropdownMenu
                        dataSource={dataSource}
                        onClick={handleOnClickItem}
                        Messages={Messages}
                        position={contentHorizontalPosition}
                        {...rest}
                        style={dropDownMenuPosition}
                        onMouseEnter={onMouseEnterHandler}
                        onMouseLeave={onMouseLeaveHandler}
                        id={idDropdown}
                    />
                </div>
            )}
        </div>
    );
};

export default Dropdown;
