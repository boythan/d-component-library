import React from "react";
import Progress from "../../../components/progress/Progress";
import { Button } from "../../../dcomponent";
import { ATTRIBUTE_INPUT_TYPE } from "../../data/TestConstant";

interface ITestGenericProps<T> {
    dataSource: Array<{ id: keyof T; label: any }>;
}

interface ITestKey {
    id?: string;
    label?: string;
    iconName?: string;
    subObject?: any;
    subMenu?: any;
    [key: string]: any;
}

function TestGeneric<T>({ dataSource }: ITestGenericProps<T>) {
    return (
        <div>
            {dataSource.map((i) => (
                <div className="text-small-bold">{i?.id ?? "N/A"}</div>
            ))}
        </div>
    );
}

const TestProgress = () => {
    const progressMethod = async () => {
        setTimeout(() => {
            return Promise.resolve(true);
        }, 2000);
    };

    const onClickShowProgress = () => {
        Progress.show({ method: progressMethod, params: [] }, (res) => {});
    };

    return (
        <div className="container">
            <Button content="Show progress" onClick={onClickShowProgress} />
            {/* eslint-disable-next-line no-undef */}
            <TestGeneric<ITestKey> dataSource={ATTRIBUTE_INPUT_TYPE} />
        </div>
    );
};

export default TestProgress;
