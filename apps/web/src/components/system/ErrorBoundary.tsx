import React from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Logs utiles en dev
    console.error("💥 ErrorBoundary caught:", error);
    console.error("Component stack:", info.componentStack);
  }

  reset = () => this.setState({ hasError: false, error: undefined });

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="text-sm text-white/60">TalentLink</div>

          <h1 className="mt-2 text-2xl font-semibold">
            {this.props.title ?? "Une erreur est survenue"}
          </h1>

          <p className="mt-2 text-white/70">
            Une page a crashé. L’application n’est plus “bloquée” grâce à l’Error Boundary.
          </p>

          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-4 max-h-64 overflow-auto rounded-xl border border-white/10 bg-black/40 p-3 text-xs text-red-200">
              {String(this.state.error?.stack ?? this.state.error?.message ?? this.state.error)}
            </pre>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500"
            >
              Recharger
            </button>

            <button
              onClick={this.reset}
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              Réessayer
            </button>
          </div>

          <p className="mt-4 text-xs text-white/50">
            Astuce : ouvre la console (F12) pour voir l’erreur exacte.
          </p>
        </div>
      </div>
    );
  }
}
