import { Tooltip } from "antd";
import React from "react";
import Icon from "../icon/Icon";

export const isString = (variable: any) => {
    return typeof variable === "string";
};

export const isObject = (object: any) => {
    return typeof object === "object";
};

export const isArray = (array: any) => {
    return Array.isArray(array);
};

export const calculateDefaultExpandedRowKeys = function (data = [], options: any) {
    const rowKeys: Array<any> = [];
    if (!(data && data.length)) {
        return rowKeys;
    }

    const defaultOptions = {
        level: -1,
        key: "id",
        ...options,
    };

    const { level, key } = defaultOptions;

    if (!data[0][key]) {
        return rowKeys;
    }

    if (level === 0) {
        return rowKeys;
    }

    const mapRowKeys = function mapRowKeys(source = [], currentLevel = 1) {
        let keys: Array<any> = [];
        source.forEach(({ children, ...rest }: any) => {
            if (children !== null) {
                keys.push(rest[key]);
                if (level < 0 || (level > 0 && level > currentLevel)) {
                    const childrenKeys = mapRowKeys(children, currentLevel + 1);
                    keys = keys.concat(childrenKeys);
                }
            }
        });
        return keys;
    };

    return mapRowKeys(data);
};

export const transformColumn = (columns = [], baseColumn = {}) => {
    return columns.map(({ title, titleCustom, titleTooltip, dataIndex, render, ...props }: any) => {
        // custom title
        let titleResult: any = title;
        if (titleCustom) {
            titleResult = titleCustom;
        } else if (titleTooltip) {
            titleResult = (
                <Tooltip className="flex-center-y" zIndex={10000} title={titleTooltip}>
                    {title}
                    <Icon name="info" className="ml-3" />
                </Tooltip>
            );
        }

        return {
            ...baseColumn,
            title: titleResult,
            dataIndex,
            render: (data: any, item: any) => {
                return {
                    children: <div className="subtitle1 nowrapCellTable">{render(data, item)}</div>,
                    props: { "data-title": title },
                };
            },
            ...props,
        };
    });
};

export default {
    transformColumn,
    calculateDefaultExpandedRowKeys,
};