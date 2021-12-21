import React from "react";
import Rating from "../../../components/elements/rating/Rating";

export interface ITestRatingProps {
    [key: string]: any;
}

const TestRating: React.FC<ITestRatingProps> = ({ id }) => {
    return (
        <div>
            <Rating value={3} range={5} />
        </div>
    );
};

export default TestRating;
