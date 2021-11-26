/* eslint-disable max-len */
import React from "react";
import moment from "moment";
import TimeUtils from "../../../utils/TimeUtils";
import Button from "../../../components/button/Button";
import UrlUtils from "../../../utils/UrlUtils";
import TreeDataUtils from "../../../utils/TreeDataUtils";
import { TREE_DATA } from "../../data/TestConstant";

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

    // console.log({ allParent });
    return (
        <div className="d-flex flex-column my-4">
            <div>{TimeUtils.convertMiliToDateTime(new Date() as any)}</div>
            <div>{TimeUtils.convertMiliToDateTime(moment(new Date()) as any)}</div>
            <div>{TimeUtils.calculateTimeDifferent(moment(new Date()), moment(new Date()))}</div>
            <div>{TimeUtils.getFirstDayOf(new Date(), "week", "MMM/YYYY" as any)}</div>
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
