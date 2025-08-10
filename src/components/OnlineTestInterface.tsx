import React, { useState } from 'react';
import { Upload, Download, Clock, FileText, Send, AlertCircle } from 'lucide-react';

interface OnlineTestInterfaceProps {
  testId: string;
  onClose: () => void;
}

export default function OnlineTestInterface({ testId, onClose }: OnlineTestInterfaceProps) {
  const [timeLeft, setTimeLeft] = useState(180); // 3 hours in minutes
  const [answerSheet, setAnswerSheet] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAnswerSheet(file);
    }
  };

  const handleSubmit = () => {
    if (answerSheet) {
      setIsSubmitted(true);
      // Handle submission logic here
      setTimeout(() => {
        alert('Test submitted successfully!');
        onClose();
      }, 2000);
    }
  };

  const downloadQuestionPaper = () => {
    // Simulate downloading question paper
    const link = document.createElement('a');
    link.href = '#'; // This would be the actual PDF URL
    link.download = `question-paper-${testId}.pdf`;
    link.click();
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Test Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Your answer sheet has been uploaded successfully. Results will be available within 24 hours.
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
                <button
                  onClick={downloadQuestionPaper}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Question Paper</span>
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
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="answerSheet"
                    className="cursor-pointer flex flex-col items-center space-y-3"
                  >
                    <Upload className="h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Click to upload your answer sheet
                      </p>
                      <p className="text-sm text-gray-600">
                        PDF, JPG, JPEG, PNG up to 10MB
                      </p>
                    </div>
                  </label>
                </div>

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
                disabled={!answerSheet}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 ${
                  answerSheet
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="h-5 w-5" />
                <span>Submit Test</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}