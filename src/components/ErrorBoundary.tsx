import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '../utils/logger';
import { RefreshCw, AlertTriangle, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error(error.message, 'ErrorBoundary', {
      componentStack: errorInfo.componentStack,
      name: error.name,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-[50vh] flex items-center justify-center p-6 bg-[#04172B] text-[#F5F8FC]"
        >
          <div className="max-w-md w-full bg-[#0B2340] border border-[#1687FF]/30 rounded-2xl p-6 sm:p-8 text-center shadow-[0_15px_35px_rgba(4,23,43,0.9)]">
            <div className="w-14 h-14 rounded-2xl bg-[#FF5A65]/15 border border-[#FF5A65]/30 flex items-center justify-center mx-auto mb-4 text-[#FF5A65]">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              {this.props.fallbackTitle || 'Algo inesperado aconteceu'}
            </h2>

            <p className="text-xs sm:text-sm text-[#AAB8CA] mt-2 leading-relaxed">
              {this.props.fallbackMessage ||
                'Ocorreu uma instabilidade pontual ao carregar este elemento. O restante do catálogo continua funcionando normalmente.'}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="btn-3d-secondary w-full sm:w-auto px-4 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 text-white"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#42C8FF]" />
                <span>Tentar Novamente</span>
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                className="btn-3d-primary w-full sm:w-auto px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 text-white"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Recarregar Página</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
