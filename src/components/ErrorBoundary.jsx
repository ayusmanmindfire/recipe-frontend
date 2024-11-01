import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details to the console without displaying them in the UI
        console.error("Error Boundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Redirect to a generic error page without showing error details in the UI
            return <Navigate to="/error" replace />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
