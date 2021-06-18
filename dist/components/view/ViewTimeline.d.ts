import React from "react";
export interface ViewTimelineProps {
    dataSource: Array<any>;
    className?: string;
    classNameLabel?: string;
    getLabel?: (data: any) => any;
    getContent?: (data: any) => any;
    customView?: (data: any) => any;
}
declare const ViewTimeline: React.FC<ViewTimelineProps>;
export default ViewTimeline;
