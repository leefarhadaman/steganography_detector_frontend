import { useRef, useState } from 'react';
import type { DetectionResponse } from '../types/api';

interface FileUploadProps {
  onResult: (result: DetectionResponse) => void;
  onError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  onClear: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onResult, onError, setLoading, onClear }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'audio/wav', 'audio/mpeg', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      onError('Unsupported file type. Please upload PNG, JPEG, WAV, MP3, or TXT.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      onError('File size exceeds 10MB limit.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://steganography-detector.onrender.com/detect', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      const data: DetectionResponse = await response.json();
      onResult(data);
      onError('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process file. Check if the backend is running.';
      onError(errorMessage);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear file input
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div
      className={`w-full max-w-md p-8 border-2 border-dashed rounded-xl text-center bg-white shadow-lg transition-all ${
        dragOver ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept=".png,.jpeg,.jpg,.wav,.mp3,.txt"
        className="hidden"
      />
      <p className="text-gray-600 mb-4 font-medium">
        Drag and drop a file here or click to upload
      </p>
      <button
        onClick={() => {
          onClear();
          fileInputRef.current?.click();
        }}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
      >
        Select File
      </button>
    </div>
  );
};

export default FileUpload;