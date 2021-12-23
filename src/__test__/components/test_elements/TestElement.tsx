import React from "react";
import ArrowItem from "../../../components/elements/arrowItem/ArrowItem";
import Dot from "../../../components/elements/dot/Dot";
import Loading from "../../../components/elements/loading/Loading";
import Rating from "../../../components/elements/rating/Rating";

export interface ITestElementProps {
    [key: string]: any;
}

const TestElement: React.FC<ITestElementProps> = ({ id }) => {
    const testDot = () => {
        return (
            <div className="my-4 d-flex align-items-center">
                <Dot color="green" size="xxx-large">
                    123
                </Dot>
                <Dot size="xx-small" />
                <Dot size="x-small" />
                <Dot size="small">99+</Dot>
                <Dot size="medium">99+</Dot>
                <Dot size="large">99+</Dot>
                <Dot size="x-large">99+</Dot>
                <Dot size="xx-large">99+</Dot>
                <Dot size="xxx-large">99+</Dot>
            </div>
        );
    };
    const testLoading = () => {
        return (
            <div className="my-4 d-flex align-items-center">
                <Loading />
                <Loading size="large" className="mx-5" />
                <Loading size="small" />
            </div>
        );
    };
    const testArrowItem = () => {
        return (
            <div className="my-4 d-flex align-items-center">
                {Array.from({ length: 7 }).map((i, index) => {
                    const isLast = index === 6;
                    const isFirst = index === 0;
                    // const color = index === 6 ? "#219653" : undefined;
                    const isActive = index === 0 ? true : undefined;
                    return (
                        <ArrowItem
                            isFirst={isFirst}
                            isLast={isLast}
                            label={index as any}
                            isActive={isActive}
                        />
                    );
                })}
            </div>
        );
    };
    return (
        <div>
            <Rating value={3} range={5} />
            {testDot()}
            {testLoading()}
            {testArrowItem()}
        </div>
    );
};

export default TestElement;
