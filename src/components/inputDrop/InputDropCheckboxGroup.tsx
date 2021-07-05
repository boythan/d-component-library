import { map } from "lodash";
import React from "react";
import CheckboxGroup, { CheckboxGroupProps } from "../checkbox/CheckboxGroup";
import InputDrop, { InputDropProps } from "./InputDrop";

interface InputDropCheckboxGroupProps extends CheckboxGroupProps, InputDropProps {
    label: string;
    value: any;
}
const InputDropCheckboxGroup = (props: InputDropCheckboxGroupProps) => {
    const {
        label,
        dataSource = [],
        numberOfColumns = "2",
        value,

        onChange,
        getLabel,
        getValue = (item) => item?.id,
        error,
        ...restProps
    } = props;

    const onClickSelectAll = () => {
        const clone = map(dataSource, (i) => {
            return getValue(i);
        });

        return onChange && onChange(clone);
    };

    const onClickClearAll = () => {
        return onChange && onChange([]);
    };

    return (
        <InputDrop
            onClickSelectAll={onClickSelectAll}
            onClickClearAll={onClickClearAll}
            label={label}
            content={() => (
                <CheckboxGroup
                    dataSource={dataSource}
                    numberOfColumns={numberOfColumns}
                    onChange={onChange}
                    value={value}
                    getLabel={getLabel}
                    getValue={getValue}
                    {...restProps}
                />
            )}
            error={error}
            {...restProps}
        />
    );
};

export default InputDropCheckboxGroup;
