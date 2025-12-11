import React from "react";
import ClassNames from "classnames";
import { Timeline as TimeLineAnt } from "antd";

export interface ViewTimelineProps {
    dataSource: Array<any>;
    className?: string;
    classNameLabel?: string;
    getLabel?: (data: any) => any;
    getContent?: (data: any) => any;
    customView?: (data: any) => any;
}

const ViewTimeline: React.FC<ViewTimelineProps> = ({
    dataSource = [],
    customView,
    className,
    classNameLabel,
    getLabel = (item) => item?.label ?? "N/A",
    getContent,
}) => {
    const wrapperClass = ClassNames("py-3 px-4", className);
    return (
        <TimeLineAnt className={wrapperClass}>
            {dataSource.map((data, index) => {
                const label = getLabel && getLabel(data);
                const content = getContent && getContent(data);
                let mainView = (
                    <div className="text-sm">
                        {label && (
                            <div className={ClassNames("font-medium text-gray-900 mb-1", classNameLabel)}>{label}</div>
                        )}
                        {content}
                    </div>
                );
                if (customView) {
                    mainView = customView(data);
                }
                // eslint-disable-next-line react/no-array-index-key
                return <TimeLineAnt.Item key={index}>{mainView}</TimeLineAnt.Item>;
            })}
        </TimeLineAnt>
    );
};

export default ViewTimeline;
