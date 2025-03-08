/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
import React, { FC, useState, useEffect } from 'react';

interface ErrorTestProps {
  triggerErrorAfter?: number; // Milliseconds to wait before triggering error
  errorType?: 'render' | 'effect' | 'event'; // Type of error to trigger
}

// Component that will throw different types of errors on demand
const ErrorTest: FC<ErrorTestProps> = ({
  triggerErrorAfter = 2000,
  errorType = 'render',
}) => {
  const [shouldError, setShouldError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'Click to test error handling'
  );

  // This effect will trigger an error after the specified delay
  useEffect(() => {
    if (errorType === 'effect') {
      const timer = setTimeout(() => {
        // This will cause an error in the effect
        throw new Error('Test error thrown in useEffect');
      }, triggerErrorAfter);

      return () => clearTimeout(timer);
    }
  }, [errorType, triggerErrorAfter]);

  // This will throw during render when shouldError is true
  if (shouldError && errorType === 'render') {
    throw new Error('Test error thrown during render');
  }

  // Function to handle button click
  const handleClick = () => {
    if (errorType === 'event') {
      // Throw error in event handler
      throw new Error('Test error thrown in event handler');
    } else {
      // Set state to trigger render error on next render
      setShouldError(true);
      setErrorMessage('Error will be triggered soon...');
    }
  };

  return (
    <div className="p-4 border border-red-300 bg-red-50 rounded-md">
      <h3 className="text-lg font-medium text-red-800 mb-2">
        Error Boundary Test Component
      </h3>
      <p className="mb-3 text-red-600">{errorMessage}</p>
      <div className="flex gap-2">
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Trigger {errorType} Error
        </button>

        <button
          onClick={() => setShouldError(false)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
      <p className="mt-3 text-sm text-gray-500">
        Current error type: <strong>{errorType}</strong>
      </p>
    </div>
  );
};

export default ErrorTest;
