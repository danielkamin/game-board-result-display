/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  Component,
  ErrorInfo,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

// Types
type ErrorHandlerProps = PropsWithChildren<{
  onError: (error: Error) => void;
}>;

// Minimal class component for error catching
class ErrorBoundaryBase extends Component<ErrorHandlerProps> {
  // Need to add this static method to properly catch errors
  static getDerivedStateFromError(_: Error) {
    // Return state update to trigger re-render
    return {};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props;
    const errorLog = {
      timestamp: new Date().toISOString(),
      error: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    };

    // Using template literal instead of concatenation
    // Moved promise handling outside callback
    const writeLog = async () => {
      try {
        // Check if the function exists before calling it
        if (window.electron?.writeErrorLog) {
          await window.electron.writeErrorLog(
            `${JSON.stringify(errorLog, null, 2)}\n`
          );
        } else {
          console.error('writeErrorLog not available in electron context');
          console.error('Error details:', errorLog);
        }
      } catch (e) {
        console.error('Failed to write error log:', e);
        console.error('Original error:', errorLog);
      }
    };
    writeLog();

    // Propagate error to parent
    onError(error);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

// Alert Component
const ErrorAlert = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
      <div
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 50,
          animation: 'slideIn 0.3s ease-out',
        }}
      >
        <div
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '1rem',
            borderRadius: '0.375rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow:
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            maxWidth: '24rem',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            style={{
              width: '1.25rem',
              height: '1.25rem',
              flexShrink: 0,
            }}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <span>{message}</span>
        </div>
      </div>
    </>
  );
};

const ErrorBoundary: React.FC<PropsWithChildren> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  return (
    <ErrorBoundaryBase onError={setError}>
      {children}
      {error && (
        <ErrorAlert
          message={error.message || 'An unexpected error occurred'}
          onClose={() => setError(null)}
        />
      )}
    </ErrorBoundaryBase>
  );
};

export default ErrorBoundary;
