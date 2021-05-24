export default EmptyView;
declare class EmptyView extends React.Component<any, any, any> {
    static propTypes: {
        mode: PropTypes.Requireable<any>;
        renderEmptyView: PropTypes.Requireable<(...args: any[]) => any>;
        renderProgress: PropTypes.Requireable<(...args: any[]) => any>;
        renderErrorView: PropTypes.Requireable<(...args: any[]) => any>;
        retry: PropTypes.Requireable<(...args: any[]) => any>;
        emptyText: PropTypes.Requireable<string>;
        filterEmptyText: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        mode: number;
        renderEmptyView: null;
        renderProgress: null;
        renderErrorView: null;
        retry: null;
        emptyText: string;
        filterEmptyText: string;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    retryInternal(): void;
    /**
     * Should not be override this method
     */
    renderProgressInternal(): any;
    /**
     * Should not be override this method
     */
    renderFilterEmptyViewInternal(): any;
    /**
     * Should not be override this method
     */
    renderEmptyViewInternal(): any;
    /**
     * Should not be override this method
     */
    renderErrorViewInternal(): any;
    /**
     * Override incase build another EmptyView in whole system
     * Incase change only few cases, we should use props.renderEmptyView
     */
    renderEmptyView(): JSX.Element;
    /**
     * Override incase build another EmptyView in whole system
     * Incase change only few cases, we should use props.renderFilterEmptyView
     */
    renderFilterEmptyView(): JSX.Element;
    /**
     * Override incase build another EmptyView in whole system
     * Incase change only few cases, we should use props.renderProgress
     */
    renderProgress(): JSX.Element;
    /**
     * Override incase build another EmptyView in whole system
     * Incase change only few cases, we should use props.renderErrorView
     */
    renderErrorView(): JSX.Element;
}
import React from "react";
import PropTypes from "prop-types";
