/* eslint-disable max-len */
import React from "react";
import moment from "moment";
import TimeUtils from "../../../utils/TimeUtils";
import Button from "../../../components/button/Button";
import UrlUtils from "../../../utils/UrlUtils";

export interface TestUtilsProps {
    [key: string]: any;
}

const TestUtils: React.FC<TestUtilsProps> = ({ id }) => {
    return (
        <div className="d-flex flex-column my-4">
            <div>{TimeUtils.convertMiliToDateTime(new Date() as any)}</div>
            <div>{TimeUtils.convertMiliToDateTime(moment(new Date()) as any)}</div>
            <div>{TimeUtils.calculateTimeDifferent(moment(new Date()), moment(new Date()))}</div>
            <Button
                content="Push State Params"
                onClick={() => UrlUtils.pushState({})}
                // onClick={() => UrlUtils.pushState({ search: "text search", filter: "filter body" })}
                className="my-4"
            />
            <Button
                content="Push Another State Params"
                onClick={() => UrlUtils.pushState({ search: "text search Another", filter: "filter body Another" })}
                className="my-4"
            />
            <Button
                content="Replace State Params"
                // onClick={() => UrlUtils.replaceState({ search: "replace text search", filter: JSON.stringify({ key: "123" }) })}
                onClick={() => UrlUtils.replaceState({})}
                className="my-4"
            />
        </div>
    );
};

export default TestUtils;
