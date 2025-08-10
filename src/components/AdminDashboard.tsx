import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, FileText, TrendingUp, Calendar, Download, Upload, Eye, Settings } from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

const mockStudentData = [
  { id: '1', name: 'Priya Sharma', email: 'priya@email.com', testsCompleted: 8, avgScore: 85, lastActive: '2025-01-15' },
  { id: '2', name: 'Arjun Kumar', email: 'arjun@email.com', testsCompleted: 7, avgScore: 78, lastActive: '2025-01-14' },
  { id: '3', name: 'Sneha Patel', email: 'sneha@email.com', testsCompleted: 9, avgScore: 92, lastActive: '2025-01-15' },
  { id: '4', name: 'Rahul Singh', email: 'rahul@email.com', testsCompleted: 6, avgScore: 73, lastActive: '2025-01-13' },
];

const mockTestData = [
  { id: '1', date: '2025-01-18', type: 'offline', registered: 45, completed: 42, avgScore: 78 },
  { id: '2', date: '2025-01-19', type: 'online', registered: 38, completed: 35, avgScore: 82 },
  { id: '3', date: '2025-01-25', type: 'offline', registered: 50, completed: 0, avgScore: 0 },
];

const responseRateData = [
  { month: 'Nov', offline: 85, online: 78 },
  { month: 'Dec', offline: 88, online: 82 },
  { month: 'Jan', offline: 92, online: 85 },
];

const chapterPerformanceData = [
  { chapter: 'Algebra', avgScore: 78, totalTests: 10 },
  { chapter: 'Geometry', avgScore: 72, totalTests: 10 },
  { chapter: 'Trigonometry', avgScore: 85, totalTests: 10 },
  { chapter: 'Statistics', avgScore: 80, totalTests: 10 },
];

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'tests' | 'analytics'>('overview');
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const totalStudents = mockStudentData.length;
  const totalTests = mockTestData.length;
  const avgResponseRate = 85;
  const avgScore = 79;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
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
              onClick={() => setActiveTab('students')}
              className={`pb-2 border-b-2 ${activeTab === 'students' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              className={`pb-2 border-b-2 ${activeTab === 'tests' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
            >
              Tests
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
                      <p className="text-blue-600 text-sm font-medium">Total Students</p>
                      <p className="text-2xl font-bold text-blue-900">{totalStudents}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Response Rate</p>
                      <p className="text-2xl font-bold text-green-900">{avgResponseRate}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">Average Score</p>
                      <p className="text-2xl font-bold text-orange-900">{avgScore}%</p>
                    </div>
                    <FileText className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Total Tests</p>
                      <p className="text-2xl font-bold text-purple-900">{totalTests}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Response Rate Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={responseRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="offline" stroke="#3B82F6" name="Offline" />
                      <Line type="monotone" dataKey="online" stroke="#10B981" name="Online" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Chapter Performance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chapterPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="chapter" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avgScore" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Student Management</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Export Data
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Tests Completed</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Avg Score</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Last Active</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudentData.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{student.testsCompleted}</td>
                        <td className="border border-gray-300 px-4 py-2">{student.avgScore}%</td>
                        <td className="border border-gray-300 px-4 py-2">{student.lastActive}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Download className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tests' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Test Management</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Question Paper</span>
                </button>
              </div>
              <div className="grid gap-4">
                {mockTestData.map((test) => (
                  <div key={test.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">Test - {test.date}</h4>
                        <p className="text-sm text-gray-600">
                          {test.type === 'online' ? 'Online' : 'Offline'} • 
                          {test.completed}/{test.registered} completed
                          {test.completed > 0 && ` • Avg: ${test.avgScore}%`}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Test Type Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Online', value: 45 },
                          { name: 'Offline', value: 55 }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        <Cell fill="#3B82F6" />
                        <Cell fill="#10B981" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Students Above 80%</span>
                      <span className="font-bold text-green-600">65%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Students 60-80%</span>
                      <span className="font-bold text-orange-600">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Students Below 60%</span>
                      <span className="font-bold text-red-600">10%</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span>Average Improvement</span>
                        <span className="font-bold text-blue-600">+12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}