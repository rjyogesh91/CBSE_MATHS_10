import React, { useState } from 'react';
import { Upload, Download, Clock, FileText, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { googleDriveService, UploadProgress } from '../utils/googleDriveApi';
import GoogleDriveAuth from './GoogleDriveAuth';

interface OnlineTestInterfaceProps {
  testId: string;
  onClose: () => void;
}

export default function OnlineTestInterface({ testId, onClose }: OnlineTestInterfaceProps) {
  const [timeLeft, setTimeLeft] = useState(180); // 3 hours in minutes
  const [answerSheet, setAnswerSheet] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file
      const validation = googleDriveService.validateFile(file);
      if (validation.isValid) {
        setAnswerSheet(file);
        setUploadError(null);
        setUploadSuccess(false);
      } else {
        setUploadError(validation.error || 'Invalid file');
        setAnswerSheet(null);
      }
    }
  };

  const handleSubmit = async () => {
    if (!answerSheet) return;

    try {
      setIsUploading(true);
      setUploadError(null);
      setUploadProgress(null);

      // Generate unique filename for answer sheet
      const studentId = 'student-123'; // This should come from props or context
      const fileName = googleDriveService.generateAnswerSheetFileName(studentId, answerSheet.name);
      
      // Upload to Google Drive
      const fileId = await googleDriveService.uploadFile(
        answerSheet,
        import.meta.env.VITE_ANSWER_SHEETS_FOLDER_ID,
        fileName,
        (progress) => setUploadProgress(progress)
      );

      console.log('File uploaded successfully with ID:', fileId);
      setUploadSuccess(true);
      setIsSubmitted(true);
      
      // Show success message and close after delay
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const downloadQuestionPaper = async () => {
    try {
      setIsDownloading(true);
      setDownloadError(null);
      
      const fileId = import.meta.env.VITE_QUESTION_PAPER_FILE_ID;
      await googleDriveService.downloadFile(fileId, `question-paper-${testId}.pdf`);
      
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadError(error instanceof Error ? error.message : 'Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Test Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Your answer sheet has been uploaded to Google Drive successfully. Results will be available within 24 hours.
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Online Test Interface</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5 text-red-600" />
                <span className="font-mono text-lg font-bold text-red-600">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Google Drive Authentication */}
          <div className="mb-6">
            <GoogleDriveAuth onAuthChange={setIsGoogleSignedIn} />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Question Paper Section */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Question Paper</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Download the question paper to start your test. The paper contains 100 marks worth of questions.
                </p>
                
                {downloadError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-red-800 text-sm">{downloadError}</span>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={downloadQuestionPaper}
                  disabled={!isGoogleSignedIn || isDownloading}
                  className={`px-6 py-3 rounded-lg flex items-center space-x-2 font-medium transition-colors ${
                    !isGoogleSignedIn || isDownloading
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
                        {!isGoogleSignedIn ? 'Sign in to Download' : 'Download Question Paper'}
                      </span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Test Instructions</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Download and read the question paper carefully</li>
                  <li>• Write your answers on a clean sheet of paper</li>
                  <li>• Clearly write your name and roll number on each page</li>
                  <li>• Take clear photos or scan your answer sheet</li>
                  <li>• Upload your answer sheet before time expires</li>
                  <li>• Ensure all pages are uploaded in correct order</li>
                </ul>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-orange-900">Important Note</h4>
                    <p className="text-sm text-orange-700">
                      Make sure your answer sheet is clearly readable. Blurry or unclear submissions may affect your evaluation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Answer Sheet Upload Section */}
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Upload className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Upload Answer Sheet</h3>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="answerSheet"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={!isGoogleSignedIn}
                  />
                  <label
                    htmlFor="answerSheet"
                    className={`flex flex-col items-center space-y-3 ${
                      !isGoogleSignedIn ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                  >
                    <Upload className="h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        {!isGoogleSignedIn ? 'Sign in to upload' : 'Click to upload your answer sheet'}
                      </p>
                      <p className="text-sm text-gray-600">
                        PDF, DOC, DOCX, JPG, JPEG, PNG up to 50MB
                      </p>
                    </div>
                  </label>
                </div>

                {uploadError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-red-800 text-sm">{uploadError}</span>
                    </div>
                  </div>
                )}

                {uploadSuccess && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-800 text-sm">File uploaded successfully to Google Drive!</span>
                    </div>
                  </div>
                )}

                {answerSheet && (
                  <div className="mt-4 p-4 bg-white rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{answerSheet.name}</p>
                          <p className="text-sm text-gray-600">
                            {(answerSheet.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setAnswerSheet(null)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                {uploadProgress && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Uploading...</span>
                      <span className="text-sm text-gray-600">{uploadProgress.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Chapter-wise Marking Scheme</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Algebra & Functions</span>
                    <span className="font-semibold">25 Marks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Geometry</span>
                    <span className="font-semibold">25 Marks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trigonometry</span>
                    <span className="font-semibold">25 Marks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Statistics & Probability</span>
                    <span className="font-semibold">25 Marks</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span>100 Marks</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!answerSheet || !isGoogleSignedIn || isUploading}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 ${
                  answerSheet && isGoogleSignedIn && !isUploading
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Submit Test</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}