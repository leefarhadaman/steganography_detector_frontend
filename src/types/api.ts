export interface DetectionResponse {
    filename: string;
    file_type: string;
    detection: {
      status: 'likely' | 'unlikely';
      confidence: number;
      details: {
        [key: string]: number;
      };
    };
    metadata: {
      [key: string]: string | number;
    };
  }