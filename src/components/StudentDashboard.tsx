import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Clock, FileText, TrendingUp, Award, Download, Upload, Eye } from 'lucide-react';

interface TestResult {
  id: string;
  date: string;
  type: 'online' | 'offline';
  totalMarks: number;
  obtainedMarks: number;
  chapterWiseMarks: {
    chapter: string;
    maxMarks: number;
    obtainedMarks: number;
  }[];
  status: 'completed' | 'pending' | 'missed';
}

interface StudentDashboardProps {
  studentId: string;
  onClose: () => void;
}

const mockTestResults: TestResult[] = [
  {
    id: '1',
    date: '2025-01-11',
    type: 'offline',
    totalMarks: 100,
    obtainedMarks: 85,
    chapterWiseMarks: [
      { chapter: 'Algebra', maxMarks: 25, obtainedMarks: 22 },
      { chapter: 'Geometry', maxMarks: 25, obtainedMarks: 20 },
      { chapter: 'Trigonometry', maxMarks: 25, obtainedMarks: 23 },
      { chapter: 'Statistics', maxMarks: 25, obtainedMarks: 20 }
    ],
    status: 'completed'
  },
  {
    id: '2',
    date: '2025-01-12',
    type: 'online',
    totalMarks: 100,
    obtainedMarks: 78,
    chapterWiseMarks: [
      { chapter: 'Algebra', maxMarks: 25, obtainedMarks: 20 },
      { chapter: 'Geometry', maxMarks: 25, obtainedMarks: 18 },
      { chapter: 'Trigonometry', maxMarks: 25, obtainedMarks: 22 },
      { chapter: 'Statistics', maxMarks: 25, obtainedMarks: 18 }
    ],
    status: 'completed'
  },
  {
    id: '3',
    date: '2025-01-18',
    type: 'offline',
    totalMarks: 100,
    obtainedMarks: 0,
    chapterWiseMarks: [],
    status: 'pending'
  }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function StudentDashboard({ studentId, onClose }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tests' | 'analytics'>('overview');
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null);

  const completedTests = mockTestResults.filter(test => test.status === 'completed');
  const averageScore = completedTests.length > 0 
    ? completedTests.reduce((sum, test) => sum + (test.obtainedMarks / test.totalMarks) * 100, 0) / completedTests.length 
    : 0;

  const progressData = completedTests.map((test, index) => ({
    test: `Test ${index + 1}`,
    score: (test.obtainedMarks / test.totalMarks) * 100,
    date: test.date
  }));

  const chapterWiseData = ['Algebra', 'Geometry', 'Trigonometry', 'Statistics'].map(chapter => {
    const chapterTests = completedTests.map(test => 
      test.chapterWiseMarks.find(c => c.chapter === chapter)
    ).filter(Boolean);
    
    const avgScore = chapterTests.length > 0
      ? chapterTests.reduce((sum, c) => sum + (c!.obtainedMarks / c!.maxMarks) * 100, 0) / chapterTests.length
      : 0;
    
    return { chapter, score: avgScore };
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Student Dashboard</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="flex space-x-6 mt-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 border-b-2 ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              className={`pb-2 border-b-2 ${activeTab === 'tests' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
            >
              Test History
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-2 border-b-2 ${activeTab === 'analytics' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
            >
              Analytics
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Tests Completed</p>
                      <p className="text-2xl font-bold text-blue-900">{completedTests.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Average Score</p>
                      <p className="text-2xl font-bold text-green-900">{averageScore.toFixed(1)}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">Next Test</p>
                      <p className="text-lg font-bold text-orange-900">Jan 18</p>
                    </div>
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Rank</p>
                      <p className="text-2xl font-bold text-purple-900">#12</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="test" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'tests' && (
            <div className="space-y-4">
              {mockTestResults.map((test) => (
                <div key={test.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        test.status === 'completed' ? 'bg-green-500' : 
                        test.status === 'pending' ? 'bg-orange-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <h4 className="font-semibold">Test - {test.date}</h4>
                        <p className="text-sm text-gray-600">
                          {test.type === 'online' ? 'Online' : 'Offline'} • 
                          {test.status === 'completed' ? ` ${test.obtainedMarks}/${test.totalMarks} marks` : ` ${test.status}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {test.status === 'completed' && (
                        <button
                          onClick={() => setSelectedTest(test)}
                          className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                      )}
                      {test.status === 'pending' && test.type === 'online' && (
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          Take Test
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Chapter-wise Performance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chapterWiseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="chapter" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Test Type Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Online', value: completedTests.filter(t => t.type === 'online').length },
                          { name: 'Offline', value: completedTests.filter(t => t.type === 'offline').length }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {[{ name: 'Online' }, { name: 'Offline' }].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>

        {selectedTest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Test Details - {selectedTest.date}</h3>
                  <button
                    onClick={() => setSelectedTest(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Overall Score</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {selectedTest.obtainedMarks}/{selectedTest.totalMarks}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${(selectedTest.obtainedMarks / selectedTest.totalMarks) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Chapter-wise Breakdown</h4>
                  {selectedTest.chapterWiseMarks.map((chapter, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>{chapter.chapter}</span>
                      <div className="text-right">
                        <span className="font-semibold">{chapter.obtainedMarks}/{chapter.maxMarks}</span>
                        <div className="text-sm text-gray-600">
                          {((chapter.obtainedMarks / chapter.maxMarks) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}