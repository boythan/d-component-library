import React, { DetailedReactHTMLElement } from "react";

export interface IWrapperComponentProps {
    element: any;
    props?: any;
}

const WrapperComponent: React.FC<IWrapperComponentProps> = ({ element, children, props = {} }) => {
    return React.cloneElement(element, { ...props }, children);
};

export default WrapperComponent;
