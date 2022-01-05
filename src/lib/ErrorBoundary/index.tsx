import React from "react";
export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: "" };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    if (error.message.includes("Loading")) {
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1 style={{ fontSize: 18, padding: 20 }}>抱歉，代码出错了~</h1>;
    }

    return this.props.children;
  }
}
