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
    const wrapperClass = ClassNames("py-3 px-4 timeline-view__wrapper", className);
    return (
        <TimeLineAnt className={wrapperClass}>
            {dataSource.map((data) => {
                const label = getLabel && getLabel(data);
                const content = getContent && getContent(data);
                let mainView = (
                    <div className="text-small">
                        {label && <div className={`text-small-bold ${classNameLabel}`}>{label}</div>}
                        {content}
                    </div>
                );
                if (customView) {
                    mainView = customView(data);
                }
                return <TimeLineAnt.Item>{mainView}</TimeLineAnt.Item>;
            })}
        </TimeLineAnt>
    );
};

export default ViewTimeline;
