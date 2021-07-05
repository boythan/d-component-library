/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from "classnames";
import { map, find, isEmpty, filter, includes } from "lodash";
import React, { useMemo, useState } from "react";
import Messages from "../../language/Messages";
import Button from "../button/Button";
import { CheckboxGroupProps } from "../checkbox/CheckboxGroup";
import Icon from "../icon/Icon";
import Select from "../select/Select";
import InputDrop, { InputDropProps } from "./InputDrop";

interface InputDropSelectProps extends CheckboxGroupProps, InputDropProps {
    label: string;
    value?: any;
}
const InputDropSelect = (props: InputDropSelectProps) => {
    const {
        label,
        dataSource = [],
        numberOfColumns = "2",
        value = [],

        onChange,
        getLabel = (item) => item.label,
        getValue = (item) => item?.id,
        error,
        ...restProps
    } = props;
    const [valueInput, setValueInput] = useState<any[]>(value);
    const [textSearch, setTextSearch] = useState<string>("");

    const dataSelectSource = useMemo(() => {
        if (isEmpty(textSearch)) return dataSource;
        return filter(dataSource, (item) => includes(getLabel(item), textSearch));
    }, [textSearch]);

    const onClickSelectAll = () => {
        const clone = map(dataSource, (i) => {
            return getValue(i);
        });
        setValueInput(clone);
    };

    const isSelected = (iValue: string) => !!find(valueInput, (id) => id === iValue);

    const onClickApply = () => {
        return onChange && onChange(valueInput);
    };

    const onChangeTextSearch = (event: any) => {
        const textValue = event.target.value;
        setTextSearch(textValue);
    };

    const onClickSelectItem = (iValue: string) => {
        const selected = isSelected(iValue);
        if (selected) {
            const dataResult = filter(valueInput, (id) => iValue !== id);
            setValueInput(dataResult);
        } else {
            setValueInput([...valueInput, iValue]);
        }
    };

    const renderValueItem = (id: string) => {
        const itemValue = find(dataSource, (item) => getValue(item) === id);
        const selected = isSelected(id);

        return (
            <div className="d-input-drop-select__item-container" onClick={() => onClickSelectItem(id)}>
                <text>{getLabel(itemValue)}</text>
                {selected && <Icon name="remove_circle" className="text-danger" />}
            </div>
        );
    };

    const renderSelectList = () => {
        return map(dataSelectSource, (item) => renderValueItem(getValue(item)));
    };

    const renderContentInput = () => {
        if (!isEmpty(textSearch)) return renderSelectList();
        return <div className="w-100">{valueInput.map(renderValueItem)}</div>;
    };

    return (
        <InputDrop
            onClickSelectAll={onClickSelectAll}
            onClickClearAll={() => setValueInput([])}
            onChangeText={onChangeTextSearch}
            onEnterText={() => setTextSearch("")}
            onClickApply={onClickApply}
            label={label}
            content={renderContentInput}
            error={error}
            {...restProps}
            valueLength={value.length}
            hideSelectAll
        />
    );
};
export default InputDropSelect;
