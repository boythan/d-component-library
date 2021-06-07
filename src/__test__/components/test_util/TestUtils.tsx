import React from "react";
import moment from "moment";
import TimeUtils from "../../../utils/TimeUtils";

export interface TestUtilsProps {
    [key: string]: any;
}

const TestUtils: React.FC<TestUtilsProps> = ({ id }) => {
    return (
        <div className="d-flex flex-column my-4">
            <div>{TimeUtils.convertMiliToDateTime(new Date() as any)}</div>
            <div>{TimeUtils.convertMiliToDateTime(moment(new Date()) as any)}</div>
            <div>{TimeUtils.calculateTimeDifferent(moment(new Date()), moment(new Date()))}</div>
        </div>
    );
};

export default TestUtils;
