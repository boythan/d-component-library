/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Dropdown as AntDropdown, MenuProps } from "antd";
import ClassNames from "classnames";
import filter from "lodash/filter";
import find from "lodash/find";
import join from "lodash/join";
import map from "lodash/map";
import React, { CSSProperties } from "react";
import Button, { ButtonProps } from "../button/Button";
import Icon from "../elements/icon/Icon";

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
    dataSource: IDropdownMenuItemProps[];
    onClick?: (item: IDropdownMenuItemProps) => void;
    Messages?: any;
    className?: string; // wrapper class
    classNameMenuItem?: string;
    styleMenuItem?: CSSProperties;
    value?: IDropdownMenuItemProps | IDropdownMenuItemProps[];
    onChange?: (values?: any) => void;
    showSelectIndicator?: boolean;
    multiple?: boolean;
    position?: "left-edge" | "right-edge"; // Deprecated/proxied to placement
}

export interface DropdownProps extends DropDownMenuProps {
    buttonProps?: ButtonProps;
    variant?: "button" | "view";
    placeholder?: string;
    className?: string; // wrapper class
    style?: CSSProperties;
    activeOnHover?: boolean;
    closeAfterSelect?: boolean;
    [key: string]: any;
}

const Dropdown: React.FC<DropdownProps> = ({
    buttonProps = {},
    dataSource = [],
    onClick,
    onChange,
    variant = "button",
    value,
    Messages,
    placeholder = "Select...",
    className,
    style,
    children,
    activeOnHover,
    multiple,
    closeAfterSelect = true,
    showSelectIndicator,
    classNameMenuItem,
    styleMenuItem,
    ...rest
}) => {
    const handleOnClickItem = (item: IDropdownMenuItemProps) => {
        if (multiple) {
            const isIn = !!find(value as any[], (i: any) => i?.id === item?.id);
            if (isIn) {
                return onChange && onChange(filter(value as any[], (i: any) => i?.id !== item?.id));
            }
            return onChange && onChange(Array.isArray(value) ? [...(value as any[]), item] : [item]);
        }
        return onClick && onClick(item);
    };

    const mapToAntdItems = (items: IDropdownMenuItemProps[]): MenuProps["items"] => {
        return items.map((item) => {
            const { id, label, iconName, image, subMenu } = item;
            const isSelected = Array.isArray(value)
                ? map(value, (i) => i?.id).includes(item?.id)
                : (value as any)?.id === item?.id;

            return {
                key: String(id),
                label: (
                    <div className="flex items-center justify-between min-w-[150px]">
                        <div className="flex items-center">
                            {(showSelectIndicator || multiple) && (
                                <div className="w-5 mr-2 flex items-center justify-center">
                                    {isSelected && <Icon name="check" />}
                                </div>
                            )}
                            {image ? (
                                <img src={image} alt="" className="w-6 h-6 object-cover mr-2" />
                            ) : (
                                iconName && <Icon name={iconName} className="mr-2" />
                            )}
                            <span>{Messages ? Messages[label] : label}</span>
                        </div>
                    </div>
                ),
                children: subMenu && subMenu.length > 0 ? mapToAntdItems(subMenu) : undefined,
                className: classNameMenuItem,
                style: styleMenuItem,
                onClick: () => handleOnClickItem(item),
            };
        });
    };

    const menuProps: MenuProps = {
        items: mapToAntdItems(dataSource),
    };

    const containerClass = ClassNames("relative inline-block", className);

    let mainView: React.ReactNode = <Button variant="trans" iconName="more_vert" {...buttonProps} />;

    if (variant === "view") {
        const renderTriggerItem = (item?: IDropdownMenuItemProps) => {
            const { image, iconName, label } = item || {};
            return (
                <div className="border flex items-center justify-between cursor-pointer px-3 py-2 rounded hover:bg-neutral-100 transition-colors duration-200">
                    <div className="flex items-center">
                        {image ? (
                            <img src={image} alt="" className="w-6 h-6 object-cover mr-2" />
                        ) : (
                            iconName && <Icon name={iconName} className="mr-2" />
                        )}
                        <span className="text-sm">{item ? (Messages ? Messages[label!] : label) : placeholder}</span>
                    </div>
                    <Icon name="expand_more" className="ml-2 text-neutral-500" />
                </div>
            );
        };

        if (value) {
            if (Array.isArray(value)) {
                mainView = (
                    <div className="cursor-pointer px-3 py-2 rounded hover:bg-neutral-100 transition-colors duration-200">
                        {value?.length
                            ? join(
                                  map(value, (i) => i?.label),
                                  ", "
                              )
                            : placeholder}
                    </div>
                );
            } else {
                mainView = renderTriggerItem(value as IDropdownMenuItemProps);
            }
        } else {
            mainView = renderTriggerItem(undefined);
        }
    }

    if (children) {
        mainView = children;
    }

    return (
        <div className={containerClass} style={style}>
            <AntDropdown
                menu={menuProps}
                trigger={activeOnHover ? ["hover"] : ["click"]}
                // placement="bottomRight" // Default behavior seems sufficient, or use position prop if needed
                {...rest}
            >
                <div className="inline-block" onClick={(e) => e.preventDefault()}>
                    {mainView}
                </div>
            </AntDropdown>
        </div>
    );
};

export default Dropdown;
