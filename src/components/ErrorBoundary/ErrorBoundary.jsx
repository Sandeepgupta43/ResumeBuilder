// src/components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("PDF Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-6xl text-center p-6 border border-red-400 bg-red-50 rounded-md text-red-700">
          <h2 className="text-lg font-semibold mb-2">Failed to render PDF</h2>
          <p>{this.state.error?.message || "An unknown error occurred."}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
