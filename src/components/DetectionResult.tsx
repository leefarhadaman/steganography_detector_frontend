import type { DetectionResponse } from '../types/api';

interface DetectionResultProps {
  result: DetectionResponse;
}

const DetectionResult: React.FC<DetectionResultProps> = ({ result }) => {
  return (
    <div className="w-full max-w-2xl mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Detection Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>Filename:</strong> {result.filename}</p>
          <p><strong>File Type:</strong> {result.file_type}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span
              className={
                result.detection.status === 'likely'
                  ? 'text-red-600'
                  : 'text-green-600'
              }
            >
              {result.detection.status}
            </span>
          </p>
          <p><strong>Confidence:</strong> {(result.detection.confidence * 100).toFixed(2)}%</p>
        </div>
        <div>
          <h3 className="font-medium">Detection Details</h3>
          {Object.entries(result.detection.details).map(([key, value]) => (
            <p key={key}>
              <strong>{key.replace('_', ' ')}:</strong> {(value * 100).toFixed(2)}%
            </p>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-medium">Metadata</h3>
        {Object.entries(result.metadata).map(([key, value]) => (
          <p key={key}>
            <strong>{key.replace('_', ' ')}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DetectionResult;