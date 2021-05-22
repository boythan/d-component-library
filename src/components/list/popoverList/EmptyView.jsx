/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/static-property-placement */
import React, { Component } from "react";
import { Spin } from "antd";
import PropTypes from "prop-types";
import PopoverMode from "./PopoverMode";

// create a component
class EmptyView extends Component {
    static propTypes = {
        mode: PropTypes.any,
        renderEmptyView: PropTypes.func,
        renderProgress: PropTypes.func,
        renderErrorView: PropTypes.func,
        retry: PropTypes.func,
        emptyText: PropTypes.string,
        filterEmptyText: PropTypes.string,
    };

    static defaultProps = {
        mode: PopoverMode.HIDDEN,
        renderEmptyView: null,
        renderProgress: null,
        renderErrorView: null,
        retry: null,
        emptyText: "No result",
        filterEmptyText: "No filter results",
    };

    retryInternal() {
        if (this.props.retry) {
            this.props.retry();
        }
    }

    /**
     * Should not be override this method
     */
    renderProgressInternal() {
        if (this.props.mode === PopoverMode.PROGRESS) {
            if (!this.props.renderProgress) {
                return this.renderProgress();
            }
            return this.props.renderProgress();
        }
        return null;
    }

    /**
     * Should not be override this method
     */
    renderFilterEmptyViewInternal() {
        if (this.props.mode !== PopoverMode.FILTER_EMPTY) return null;
        return this.props.renderFilterEmptyView ? this.props.renderFilterEmptyView() : this.renderFilterEmptyView();
    }

    /**
     * Should not be override this method
     */
    renderEmptyViewInternal() {
        if (this.props.mode !== PopoverMode.EMPTY) return null;
        return this.props.renderEmptyView ? this.props.renderEmptyView() : this.renderEmptyView();
    }

    /**
     * Should not be override this method
     */
    renderErrorViewInternal() {
        if (this.props.mode === PopoverMode.ERROR) {
            if (!this.props.renderErrorView) {
                return this.renderErrorView();
            }
            return this.props.renderErrorView();
        }
        return null;
    }

    /**
     * Override incase build another EmptyView in whole system
     * Incase change only few cases, we should use props.renderEmptyView
     */
    renderEmptyView() {
        return <div className="subTitle2">{this.props.emptyText}</div>;
    }

    /**
     * Override incase build another EmptyView in whole system
     * Incase change only few cases, we should use props.renderFilterEmptyView
     */
    renderFilterEmptyView() {
        return <div className="subTitle2">{this.props.filterEmptyText}</div>;
    }

    /**
     * Override incase build another EmptyView in whole system
     * Incase change only few cases, we should use props.renderProgress
     */
    // eslint-disable-next-line class-methods-use-this
    renderProgress() {
        return <Spin size="large" />;
    }

    /**
     * Override incase build another EmptyView in whole system
     * Incase change only few cases, we should use props.renderErrorView
     */
    // eslint-disable-next-line class-methods-use-this
    renderErrorView() {
        return <div className="subTitle2">No result</div>;
    }

    render() {
        // If mode not set or hidden do not render EmptyView
        if (!this.props.mode || this.props.mode === PopoverMode.HIDDEN) return null;
        // Render EmptyView coresponds with it's mode
        return (
            // pointerEvents to prevent touch to EmptyView and pass through to under component.
            // But still accept its children view receive touch.
            <div className="emptyView-popoverlist" pointerEvents="box-none">
                {this.renderEmptyViewInternal()}
                {this.renderErrorViewInternal()}
                {this.renderProgressInternal()}
                {this.renderFilterEmptyViewInternal()}
            </div>
        );
    }
}

export default EmptyView;
