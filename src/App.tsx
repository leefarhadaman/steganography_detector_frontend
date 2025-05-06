import { useState } from 'react';
import FileUpload from './components/FileUpload';
import DetectionResult from './components/DetectionResult';
import type { DetectionResponse } from './types/api';

function App() {
  const [result, setResult] = useState<DetectionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClear = () => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 drop-shadow-md">
        Steganography Detector
      </h1>
      <FileUpload
        onResult={setResult}
        onError={setError}
        setLoading={setIsLoading}
        onClear={handleClear}
      />
      {isLoading && (
        <div className="mt-6 flex items-center gap-2 text-blue-600 animate-pulse">
          <svg
            className="animate-spin h-6 w-6 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing file...
        </div>
      )}
      {error && (
        <div className="mt-6 text-red-600 bg-red-100 p-4 rounded-lg shadow-md max-w-md">
          {error}
        </div>
      )}
      {result && (
        <div className="mt-6 animate-fade-in">
          <DetectionResult result={result} />
          <button
            onClick={handleClear}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear Results
          </button>
        </div>
      )}
    </div>
  );
}

export default App;