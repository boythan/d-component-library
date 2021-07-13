import React from "react";
import PopoverList from "../../../components/popover/PopoverList";

export interface ITestListProps {
    [key: string]: any;
}
const TestPopover: React.FC<ITestListProps> = ({ id }) => {
    return (
        <div className="my-4">
            <PopoverList
                className="w-25"
                source={async (paging) => {
                    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                    return Promise.resolve(res);
                }}
                transformer={async (res) => {
                    // const data = JSON.stringify(res);
                    const data = await res.json();

                    return data;
                }}
                buttonText="New"
                buttonIconName="add"
                loadMoreText="Load More"
                renderItem={(item: any) => item?.id}
            />
        </div>
    );
};

export default TestPopover;
