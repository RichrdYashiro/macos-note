import { Button } from "@mantine/core";
import { Component, type ErrorInfo } from "react";

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  static getDerivedStateFromError(error: Error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h5>Что-то пошло не так</h5>
          <Button onClick={this.handleReset}>Попробывать снова</Button>;
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
