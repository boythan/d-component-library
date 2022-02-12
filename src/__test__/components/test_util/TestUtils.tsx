/* eslint-disable max-len */
import React from "react";
import moment from "moment";
import TimeUtils from "../../../utils/TimeUtils";
import Button from "../../../components/button/Button";
import UrlUtils from "../../../utils/UrlUtils";
import TreeDataUtils from "../../../utils/TreeDataUtils";
import { TREE_DATA } from "../../data/TestConstant";
import ViewCollapse from "../../../components/view/ViewCollapse";
import ViewRow from "../../../components/view/ViewRow";

export interface TestUtilsProps {
    [key: string]: any;
}

const TestUtils: React.FC<TestUtilsProps> = ({ id }) => {
    const testNode = {
        id: "createPaySlipSub_1",
        label: "createPaySlipSub_1",
        title: "createPaySlipSub_1",
        notShow: true,
        parentId: "createPaySlipSub",
    };
    const allParent = TreeDataUtils.getAllParentNode(testNode, TREE_DATA, "parentId");

    const { hours, days, minutes, seconds } = TimeUtils.calculatePreciseDifferentTime({
        from: "12/02/2022 10:25",
        to: "12/05/2022 9:25",
    });

    // console.log({ allParent });
    return (
        <div className="d-flex flex-column my-4">
            <ViewCollapse label="Time Utils">
                <div>{TimeUtils.convertMiliToDateTime(new Date() as any)}</div>
                <div>{TimeUtils.convertMiliToDateTime(moment(new Date()) as any)}</div>
                <div>{TimeUtils.calculateTimeDifferent(moment(new Date()), moment(new Date()))}</div>
                <div>{TimeUtils.getFirstDayOf(new Date(), "week", "MMM/YYYY" as any)}</div>
                <ViewRow label="Calculate Precise Different Time" className="my-3">
                    {`${days} days: ${hours} hours: ${minutes} minutes : ${seconds} seconds}`}
                </ViewRow>
            </ViewCollapse>
            <ViewCollapse label="URL Utils" className="my-5">
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
            </ViewCollapse>
        </div>
    );
};

export default TestUtils;
