import React, { DetailedReactHTMLElement } from "react";

export interface IWrapperComponentProps {
    element: React.ReactElement;
    props?: any;
}

const WrapperComponent: React.FC<IWrapperComponentProps> = ({ element, children, props = {} }) => {
    return React.cloneElement(element, { ...props }, children);
};

export default WrapperComponent;
