import React from "react";
import { Button } from "./ui/button";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { error } = this.state;

      return (
        <div className="min-h-screen w-full bg-blue-200 flex items-center justify-center p-6">
          <div className="p-6 text-center bg-white rounded-md shadow-md w-full max-w-3xl">
            <h2 className="text-xl font-semibold mb-2">Algo deu errado 😕</h2>

            <p className="text-muted-foreground mb-2">
              Ocorreu o seguinte erro:
            </p>

            <pre className="bg-gray-50 p-3 rounded text-sm text-left text-red-700 whitespace-pre-wrap mb-4">
              {error?.message ?? String(error)}
              {error?.stack ? "\n\n" + error.stack : null}
            </pre>

            <div className="flex items-center justify-center gap-2">
              <Button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Recarregar
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
