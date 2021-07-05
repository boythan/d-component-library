import { map } from "lodash";
import React, { useState } from "react";
import CheckboxGroup, { CheckboxGroupProps } from "../checkbox/CheckboxGroup";
import InputDrop, { InputDropProps } from "./InputDrop";

interface InputDropCheckboxGroupProps extends CheckboxGroupProps, InputDropProps {
    label: string;
    value?: any;
}
const InputDropCheckboxGroup = (props: InputDropCheckboxGroupProps) => {
    const {
        label,
        dataSource = [],
        numberOfColumns = "2",
        value = [],

        onChange,
        getLabel,
        getValue = (item) => item?.id,
        error,
        ...restProps
    } = props;
    const [valueInput, setValueInput] = useState<any[]>(value);

    const onClickSelectAll = () => {
        const clone = map(dataSource, (i) => {
            return getValue(i);
        });
        setValueInput(clone);
    };

    const onClickApply = () => {
        return onChange && onChange(valueInput);
    };

    return (
        <InputDrop
            onClickSelectAll={onClickSelectAll}
            onClickClearAll={() => setValueInput([])}
            onClickApply={onClickApply}
            label={label}
            content={() => (
                <CheckboxGroup
                    dataSource={dataSource}
                    numberOfColumns={numberOfColumns}
                    onChange={setValueInput}
                    getLabel={getLabel}
                    getValue={getValue}
                    {...restProps}
                    value={valueInput}
                />
            )}
            error={error}
            {...restProps}
            valueLength={value.length}
        />
    );
};

export default InputDropCheckboxGroup;
