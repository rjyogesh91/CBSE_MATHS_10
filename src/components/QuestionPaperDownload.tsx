import React, { useState } from 'react';
import { Download, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { googleDriveService } from '../utils/googleDriveApi';

interface QuestionPaperDownloadProps {
  fileId: string;
  fileName?: string;
  testDate?: string;
  isSignedIn: boolean;
  className?: string;
}

export default function QuestionPaperDownload({ 
  fileId, 
  fileName = 'question-paper.pdf',
  testDate,
  isSignedIn,
  className = ''
}: QuestionPaperDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setError(null);
      setSuccess(false);
      
      await googleDriveService.downloadFile(fileId, fileName);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (error) {
      console.error('Download failed:', error);
      setError(error instanceof Error ? error.message : 'Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={!isSignedIn || isDownloading}
        className={`w-full px-6 py-3 rounded-lg flex items-center justify-center space-x-2 font-medium transition-colors ${
          !isSignedIn || isDownloading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isDownloading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <span>Downloading...</span>
          </>
        ) : (
          <>
            <Download className="h-5 w-5" />
            <span>
              {!isSignedIn ? 'Sign in to Download' : 'Download Question Paper'}
            </span>
          </>
        )}
      </button>

      {/* Test Information */}
      {testDate && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Test Date: {testDate}</p>
              <p className="text-sm text-gray-600">Duration: 3 Hours • Total Marks: 100</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-red-600 hover:text-red-800 underline text-sm"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-green-800 text-sm">Question paper downloaded successfully!</span>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Download Instructions:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click the download button to get the question paper</li>
          <li>• The file will be saved to your device's Downloads folder</li>
          <li>• Make sure you have a PDF reader installed</li>
          <li>• Print the paper if you prefer working on physical copy</li>
        </ul>
      </div>
    </div>
  );
}