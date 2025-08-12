import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle, FileText, X } from 'lucide-react';
import { googleDriveService, UploadProgress } from '../utils/googleDriveApi';

interface AnswerSheetUploadProps {
  folderId: string;
  studentId: string;
  testId: string;
  isSignedIn: boolean;
  onUploadComplete?: (fileId: string) => void;
  className?: string;
}

export default function AnswerSheetUpload({ 
  folderId, 
  studentId, 
  testId,
  isSignedIn,
  onUploadComplete,
  className = ''
}: AnswerSheetUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = googleDriveService.validateFile(file);
    if (validation.isValid) {
      setSelectedFile(file);
      setError(null);
      setSuccess(false);
    } else {
      setError(validation.error || 'Invalid file');
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !isSignedIn) return;

    try {
      setIsUploading(true);
      setError(null);
      setUploadProgress(null);

      // Generate unique filename
      const fileName = googleDriveService.generateAnswerSheetFileName(
        `${studentId}-${testId}`, 
        selectedFile.name
      );
      
      // Upload to Google Drive
      const fileId = await googleDriveService.uploadFile(
        selectedFile,
        folderId,
        fileName,
        (progress) => setUploadProgress(progress)
      );

      setUploadedFileId(fileId);
      setSuccess(true);
      onUploadComplete?.(fileId);
      
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error instanceof Error ? error.message : 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
    setSuccess(false);
    setUploadProgress(null);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* File Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          id="answerSheet"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
          disabled={!isSignedIn || isUploading || success}
        />
        <label
          htmlFor="answerSheet"
          className={`flex flex-col items-center space-y-3 ${
            !isSignedIn || isUploading || success 
              ? 'cursor-not-allowed opacity-50' 
              : 'cursor-pointer hover:bg-gray-50'
          } p-4 rounded-lg transition-colors`}
        >
          <Upload className="h-12 w-12 text-gray-400" />
          <div>
            <p className="text-lg font-medium text-gray-900">
              {!isSignedIn 
                ? 'Sign in to upload' 
                : success 
                ? 'Upload completed!' 
                : 'Click to upload your answer sheet'
              }
            </p>
            <p className="text-sm text-gray-600">
              PDF, DOC, DOCX, JPG, JPEG, PNG up to 50MB
            </p>
          </div>
        </label>
      </div>

      {/* Selected File Display */}
      {selectedFile && (
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-600">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            {!isUploading && !success && (
              <button
                onClick={removeFile}
                className="text-red-600 hover:text-red-800 p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploadProgress && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Uploading to Google Drive...</span>
            <span className="text-sm text-gray-600">{uploadProgress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress.percentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            {(uploadProgress.loaded / 1024 / 1024).toFixed(1)} MB of {(uploadProgress.total / 1024 / 1024).toFixed(1)} MB
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-green-800 text-sm">
              Answer sheet uploaded successfully to Google Drive!
            </span>
          </div>
          {uploadedFileId && (
            <p className="text-xs text-green-700 mt-1">
              File ID: {uploadedFileId}
            </p>
          )}
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && !success && (
        <button
          onClick={handleUpload}
          disabled={!isSignedIn || isUploading}
          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 ${
            !isSignedIn || isUploading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="h-5 w-5" />
              <span>Upload to Google Drive</span>
            </>
          )}
        </button>
      )}

      {/* Instructions */}
      <div className="bg-orange-50 rounded-lg p-4">
        <h4 className="font-medium text-orange-900 mb-2">Upload Instructions:</h4>
        <ul className="text-sm text-orange-800 space-y-1">
          <li>• Write your name and student ID clearly on each page</li>
          <li>• Take clear photos or scan your answer sheet</li>
          <li>• Ensure all pages are included and in correct order</li>
          <li>• File will be automatically saved to Google Drive</li>
          <li>• You can upload PDF, DOC, DOCX, or image files</li>
        </ul>
      </div>
    </div>
  );
}