import { Tooltip } from "antd";
import React from "react";
import Icon from "../components/icon/Icon";

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

export const transformColumn = (columns: Array<any> = [], baseColumn: any = {}): Array<any> => {
    return columns.map(({ title, titleTooltip, dataIndex, render, mobileTitle, ...props }: any, index: number) => {
        // custom title
        let titleResult: any = title;
        let mobileTitleResult: any = title;
        if (typeof title === "function") {
            titleResult = title();
        }
        if (titleTooltip) {
            titleResult = (
                <Tooltip className="flex-center-y" zIndex={10000} title={titleTooltip}>
                    {title}
                    <Icon name="info" className="ml-3" />
                </Tooltip>
            );
        }

        if (mobileTitle) {
            mobileTitleResult = mobileTitle;
        }
        return {
            ...baseColumn,
            id: `${index}`,
            title: titleResult,
            align: "left",
            isDefault: true,
            dataIndex,
            render: (data: any, item: any, index: number) => {
                let content = data;
                if (typeof render === "function") {
                    content = render(data, item, index);
                }
                return {
                    children: content,
                    props: { "data-title": mobileTitleResult },
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
