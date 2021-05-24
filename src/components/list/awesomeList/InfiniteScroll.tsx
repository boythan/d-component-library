/* eslint-disable react/static-property-placement */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class InfiniteScroll extends Component<any, any> {
    static propTypes = {
        children: PropTypes.node.isRequired,
        element: PropTypes.node,
        hasMore: PropTypes.bool,
        initialLoad: PropTypes.bool,
        isReverse: PropTypes.bool,
        loader: PropTypes.node,
        loadMore: PropTypes.func.isRequired,
        pageStart: PropTypes.number,
        ref: PropTypes.func,
        getScrollParent: PropTypes.func,
        threshold: PropTypes.number,
        useCapture: PropTypes.bool,
        useWindow: PropTypes.bool,
    };

    static defaultProps = {
        element: "div",
        hasMore: false,
        initialLoad: true,
        pageStart: 0,
        ref: null,
        threshold: 250,
        useWindow: true,
        isReverse: false,
        useCapture: false,
        loader: null,
        getScrollParent: null,
    };

    pageLoaded: any;

    options: any;

    loadMore: any;

    scrollComponent: any;

    beforeScrollHeight: any;

    defaultLoader: any;

    beforeScrollTop: any;

    constructor(props: any) {
        super(props);

        this.scrollListener = this.scrollListener.bind(this);
        this.eventListenerOptions = this.eventListenerOptions.bind(this);
        this.mousewheelListener = this.mousewheelListener.bind(this);
    }

    componentDidMount() {
        const { pageStart } = this.props;
        this.pageLoaded = pageStart;
        this.options = this.eventListenerOptions();
        this.attachScrollListener();
    }

    componentDidUpdate() {
        const { isReverse } = this.props;
        if (isReverse && this.loadMore) {
            const parentElement = this.getParentElement(this.scrollComponent);
            parentElement.scrollTop = parentElement.scrollHeight - this.beforeScrollHeight + this.beforeScrollTop;
            this.loadMore = false;
        }
        this.attachScrollListener();
    }

    componentWillUnmount() {
        this.detachScrollListener();
        this.detachMousewheelListener();
    }

    isPassiveSupported() {
        let passive = false;

        const testOptions = {
            // eslint-disable-next-line getter-return
            get passive() {
                passive = true;
                return passive;
            },
        };

        try {
            document.addEventListener("test" as any, null as any, testOptions as any);
            document.removeEventListener("test" as any, null as any, testOptions as any);
        } catch (e) {
            // ignore
        }
        return passive;
    }

    eventListenerOptions() {
        const { useCapture } = this.props;
        let options = useCapture;

        if (this.isPassiveSupported()) {
            options = {
                useCapture,
                passive: true,
            };
        } else {
            options = {
                passive: false,
            };
        }
        return options;
    }

    // Set a defaut loader for all your `InfiniteScroll` components
    setDefaultLoader(loader: any) {
        this.defaultLoader = loader;
    }

    detachMousewheelListener() {
        let scrollEl = window;
        const { useCapture, useWindow } = this.props;
        if (useWindow === false) {
            scrollEl = this.scrollComponent.parentNode;
        }

        scrollEl.removeEventListener("mousewheel", this.mousewheelListener, this.options ? this.options : useCapture);
    }

    detachScrollListener() {
        let scrollEl = window;
        const { useCapture, useWindow } = this.props;
        if (useWindow === false) {
            scrollEl = this.getParentElement(this.scrollComponent);
        }

        scrollEl.removeEventListener("scroll", this.scrollListener, this.options ? this.options : useCapture);
        scrollEl.removeEventListener("resize", this.scrollListener, this.options ? this.options : useCapture);
    }

    getParentElement(el: any) {
        const { getScrollParent } = this.props;
        const scrollParent = getScrollParent && getScrollParent();
        if (scrollParent != null) {
            return scrollParent;
        }
        return el && el.parentNode;
    }

    filterProps(props: any) {
        return props;
    }

    attachScrollListener() {
        const parentElement = this.getParentElement(this.scrollComponent);
        const { useWindow, useCapture, initialLoad, hasMore } = this.props;

        if (!hasMore || !parentElement) {
            return;
        }

        let scrollEl = window;
        if (useWindow === false) {
            scrollEl = parentElement;
        }

        scrollEl.addEventListener("mousewheel", this.mousewheelListener, this.options ? this.options : useCapture);
        scrollEl.addEventListener("scroll", this.scrollListener, this.options ? this.options : useCapture);
        scrollEl.addEventListener("resize", this.scrollListener, this.options ? this.options : useCapture);

        if (initialLoad) {
            this.scrollListener();
        }
    }

    mousewheelListener(e: any) {
        // Prevents Chrome hangups
        // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
        if (e.deltaY === 1 && !this.isPassiveSupported()) {
            e.preventDefault();
        }
    }

    scrollListener() {
        const { isReverse, useWindow, threshold, loadMore } = this.props;
        const el = this.scrollComponent;
        const scrollEl = window;
        const parentNode = this.getParentElement(el);

        let offset;
        if (useWindow) {
            const doc = document.documentElement || document.body.parentNode || document.body;
            const scrollTop = scrollEl.pageYOffset !== undefined ? scrollEl.pageYOffset : doc.scrollTop;
            if (isReverse) {
                offset = scrollTop;
            } else {
                offset = this.calculateOffset(el, scrollTop);
            }
        } else if (isReverse) {
            offset = parentNode.scrollTop;
        } else {
            offset = parentNode.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
        }

        // Here we make sure the element is visible as well as checking the offset
        if (offset < Number(threshold) && el && el.offsetParent !== null) {
            this.detachScrollListener();
            this.beforeScrollHeight = parentNode.scrollHeight;
            this.beforeScrollTop = parentNode.scrollTop;
            // Call loadMore after detachScrollListener to allow for non-async loadMore functions
            if (typeof loadMore === "function") {
                loadMore((this.pageLoaded += 1));
                this.loadMore = true;
            }
        }
    }

    calculateOffset(el: any, scrollTop: any) {
        if (!el) {
            return 0;
        }

        return this.calculateTopPosition(el) + (el.offsetHeight - scrollTop - window.innerHeight);
    }

    calculateTopPosition(el: any): any {
        if (!el) {
            return 0;
        }
        return el.offsetTop + this.calculateTopPosition(el.offsetParent);
    }

    render() {
        const renderProps = this.filterProps(this.props);
        const {
            children,
            element,
            hasMore,
            initialLoad,
            isReverse,
            loader,
            loadMore,
            pageStart,
            ref,
            threshold,
            useCapture,
            useWindow,
            getScrollParent,
            ...props
        } = renderProps;

        props.ref = (node: any) => {
            this.scrollComponent = node;
            if (ref) {
                ref(node);
            }
        };

        const childrenArray = [children];
        if (hasMore) {
            if (loader) {
                isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
            } else if (this.defaultLoader) {
                isReverse ? childrenArray.unshift(this.defaultLoader) : childrenArray.push(this.defaultLoader);
            }
        }
        return React.createElement(element, props, childrenArray);
    }
}
