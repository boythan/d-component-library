import React from "react";
import AwesomeListComponent from "../../../components/list/awesomeList/AwesomeListComponent";
import API from "../../network/API";

export interface ITestListProps {
    [key: string]: any;
}

const TestList: React.FC<ITestListProps> = ({ id }) => {
    return (
        <div className="my-4" style={{ height: "1500px" }}>
            {/* <PopoverList
                source={async (paging) => {
                    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                    return Promise.resolve(res);
                }}
                transformer={async (res) => {
                    // const data = JSON.stringify(res);
                    const data = await res.json();
                    console.log({ data });
                    return data;
                }}
                buttonText="New"
                buttonIconName="add"ƒ
                loadMoreText="Load More"
                renderItem={(item) => item?.id}
            /> */}
            <AwesomeListComponent
                source={async (paging) => {
                    // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                    const body: any = {};
                    body.status = ["pending", "approved"];
                    return API.productList(body, paging);
                }}
                transformer={(res) => {
                    return res?.data?.data?.brand ?? [];
                }}
                renderItem={(item, index) => (
                    <div className="my-4 p-4 border bg-muted label">
                        {item?.name}
                        <div className="py-3 text-x-small">{item?.id}</div>
                    </div>
                )}
                isPaging
                pagingProps={{ pageIndex: 1, pageSize: 10 }}
                variant="load-more"
            />
        </div>
    );
};

export default TestList;
