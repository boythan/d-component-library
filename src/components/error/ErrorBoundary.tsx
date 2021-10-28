import React from "react";

export interface ErrorBoundaryProps {
    children: any;
}

export interface ErrorBoundaryState {
    hasError: boolean;
    error: any;
    errorInfo: any;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: "", errorInfo: "" };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ error, errorInfo });
    }

    render() {
        const { hasError, errorInfo } = this.state;
        if (hasError) {
            return (
                <div className="w-100 h-100 flex-column align-items-center p-5">
                    <h3>Something went wrong!!!</h3>
                    <div className="mt-3">{JSON.stringify(errorInfo)}</div>
                </div>
            );
        }

        // eslint-disable-next-line react/destructuring-assignment
        return this.props.children;
    }
}

export default ErrorBoundary;
