import React, { useState } from 'react';
import { Calculator, Clock, Users, Award, BookOpen, CheckCircle, Phone, Mail, MapPin, Calendar, TrendingUp, Star, Monitor, MapPin as LocationIcon, UserCheck, BarChart3 } from 'lucide-react';
import StudentDashboard from './components/StudentDashboard';
import OnlineTestInterface from './components/OnlineTestInterface';
import AdminDashboard from './components/AdminDashboard';

// ===== WEEKLY TEST CONFIGURATION =====
// Update this section every week with new test details
const CURRENT_TEST_CONFIG = {
  date: "Saturday, Jan 18",
  time: "7:00 AM - 10:00 AM",
  duration: "3 Hours",
  topics: [
    { name: "Algebra & Functions", marks: 25 },
    { name: "Geometry", marks: 25 },
    { name: "Trigonometry", marks: 15 },
    { name: "Statistics", marks: 20 }
  ]
};
// ==========================================

// CBSE Class 10 Mathematics Chapter-wise Question Blueprint
const CBSE_QUESTION_BLUEPRINT = [
  { chapter: "Real Numbers", marks1: 1, marks2: 0, marks3: 2, marks4: 0, total: 999 },
  { chapter: "Polynomials", marks1: 2, marks2: 2, marks3: 0, marks4: 0, total: 4 },
  { chapter: "Pair of Linear Equations in Two Variables", marks1: 2, marks2: 2, marks3: 3, marks4: 0, total: 7 },
  { chapter: "Quadratic Equations", marks1: 2, marks2: 0, marks3: 3, marks4: 0, total: 5 },
  { chapter: "Arithmetic Progressions", marks1: 2, marks2: 2, marks3: 0, marks4: 4, total: 8 },
  { chapter: "Triangles", marks1: 2, marks2: 2, marks3: 3, marks4: 0, total: 7 },
  { chapter: "Coordinate Geometry", marks1: 2, marks2: 2, marks3: 3, marks4: 0, total: 7 },
  { chapter: "Introduction to Trigonometry", marks1: 2, marks2: 2, marks3: 3, marks4: 0, total: 7 },
  { chapter: "Some Applications of Trigonometry", marks1: 2, marks2: 0, marks3: 3, marks4: 0, total: 5 },
  { chapter: "Circles", marks1: 2, marks2: 2, marks3: 0, marks4: 4, total: 8 },
  { chapter: "Areas Related to Circles", marks1: 2, marks2: 2, marks3: 3, marks4: 0, total: 7 },
  { chapter: "Surface Areas and Volumes", marks1: 2, marks2: 2, marks3: 0, marks4: 4, total: 8 },
  { chapter: "Statistics", marks1: 2, marks2: 2, marks3: 3, marks4: 0, total: 7 },
  { chapter: "Probability", marks1: 2, marks2: 2, marks3: 0, marks4: 0, total: 4 }
];
function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    parentName: '',
    school: ''
  });

  const [showStudentDashboard, setShowStudentDashboard] = useState(false);
  const [showOnlineTest, setShowOnlineTest] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [selectedTestMode, setSelectedTestMode] = useState<'online' | 'offline' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for registering! We will contact you soon.');
    setFormData({ name: '', phone: '', email: '', parentName: '', school: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">MathAce Test Series</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#schedule" className="text-gray-700 hover:text-blue-600 transition-colors">Schedule</a>
              <a href="#test-modes" className="text-gray-700 hover:text-blue-600 transition-colors">Test Modes</a>
              <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors">Benefits</a>
              <button
                onClick={() => setShowStudentDashboard(true)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Student Login
              </button>
              <button
                onClick={() => setShowAdminDashboard(true)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Admin
              </button>
              <a href="#register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Register Now</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Master Class 10 
                <span className="text-blue-600 block">CBSE Mathematics</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join our comprehensive test series every weekend and boost your math scores with expert guidance and regular practice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#register" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center">
                  Enroll Now
                </a>
                <a href="#about" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center">
                  Learn More
                </a>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span>Every Sat & Sun</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Small Batches</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <span>Expert Faculty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Monitor className="h-5 w-5 text-green-600" />
                  <span>Online & Offline</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">CBSE Board Exam Blueprint</h3>
                  <p className="text-gray-600">Chapter-wise Question Distribution (80 Marks)</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-2 font-semibold text-gray-900">Chapter</th>
                        <th className="text-center p-2 font-semibold text-blue-600">1M</th>
                        <th className="text-center p-2 font-semibold text-green-600">2M</th>
                        <th className="text-center p-2 font-semibold text-orange-600">3M</th>
                        <th className="text-center p-2 font-semibold text-purple-600">4M</th>
                        <th className="text-center p-2 font-semibold text-gray-900">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CBSE_QUESTION_BLUEPRINT.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-2 text-gray-800 text-xs">{item.chapter}</td>
                          <td className="text-center p-2 text-blue-600 font-medium">{item.marks1}</td>
                          <td className="text-center p-2 text-green-600 font-medium">{item.marks2}</td>
                          <td className="text-center p-2 text-orange-600 font-medium">{item.marks3}</td>
                          <td className="text-center p-2 text-purple-600 font-medium">{item.marks4}</td>
                          <td className="text-center p-2 text-gray-900 font-bold">{item.total}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-100 font-bold">
                        <td className="p-2 text-gray-900">Total Questions</td>
                        <td className="text-center p-2 text-blue-600">28</td>
                        <td className="text-center p-2 text-green-600">12</td>
                        <td className="text-center p-2 text-orange-600">8</td>
                        <td className="text-center p-2 text-purple-600">3</td>
                        <td className="text-center p-2 text-gray-900">80</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Note:</span> Internal Assessment (20 Marks) + Board Exam (80 Marks) = 100 Marks Total
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Modes Section */}
      <section id="test-modes" className="py-16 bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Test Mode
            </h2>
            <p className="text-xl text-gray-600">
              Flexible options to suit your learning style and convenience
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LocationIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Offline Tests</h3>
                <p className="text-gray-600">Traditional classroom experience</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Every Saturday & Sunday, 7-10 AM</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Direct interaction with faculty</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Immediate doubt resolution</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Peer learning environment</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Instant result discussion</span>
                </li>
              </ul>
              <button
                onClick={() => setSelectedTestMode('offline')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Choose Offline Mode
              </button>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Online Tests</h3>
                <p className="text-gray-600">Convenient home-based testing</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Take tests from home comfort</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Download question papers instantly</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Upload answer sheets easily</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Flexible timing within test window</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Digital performance tracking</span>
                </li>
              </ul>
              <button
                onClick={() => setShowOnlineTest(true)}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Try Online Test
              </button>
            </div>
          </div>
          
          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Chapter-wise Marking Scheme
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Algebra & Functions</h4>
                <div className="text-2xl font-bold text-blue-600">25</div>
                <div className="text-sm text-blue-700">Marks</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Geometry</h4>
                <div className="text-2xl font-bold text-green-600">25</div>
                <div className="text-sm text-green-700">Marks</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Trigonometry</h4>
                <div className="text-2xl font-bold text-orange-600">25</div>
                <div className="text-sm text-orange-700">Marks</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Statistics & Probability</h4>
                <div className="text-2xl font-bold text-purple-600">25</div>
                <div className="text-sm text-purple-700">Marks</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 bg-gray-100 px-6 py-3 rounded-lg">
                <span className="text-lg font-semibold text-gray-900">Total: 100 Marks</span>
                <span className="text-sm text-gray-600">• Duration: 3 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Test Series?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive test series is designed to help Class 10 students excel in CBSE Mathematics with regular practice and expert feedback.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">CBSE Aligned</h3>
              <p className="text-gray-600">
                All tests are designed according to the latest CBSE syllabus and exam pattern for Class 10 Mathematics.
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Tracking</h3>
              <p className="text-gray-600">
                Comprehensive analytics dashboard with chapter-wise breakdown, progress tracking, and personalized improvement suggestions.
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Get personalized feedback, detailed solutions, and one-on-one doubt resolution from experienced CBSE mathematics teachers.
              </p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <BarChart3 className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Analytics</h3>
              <p className="text-gray-600">
                Advanced analytics to track student response rates, identify learning patterns, and optimize teaching strategies.
              </p>
            </div>
            <div className="bg-teal-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <UserCheck className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible Options</h3>
              <p className="text-gray-600">
                Choose between online and offline test modes based on your convenience and learning preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Test Schedule & Format
            </h2>
            <p className="text-xl text-gray-600">
              Regular weekend tests to keep you exam-ready
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Every Saturday & Sunday</h3>
                    <p className="text-gray-600">Consistent weekly practice</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">7:00 AM - 10:00 AM</h3>
                    <p className="text-gray-600">3-hour comprehensive tests</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">100 Marks Total</h3>
                    <p className="text-gray-600">Board exam pattern simulation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
              <ul className="space-y-4">
                {[
                  'Weekly mock tests based on CBSE pattern',
                  'Immediate answer key discussion',
                  'Individual performance analysis',
                  'Chapter-wise strength & weakness report',
                  'Doubt clearing session after each test',
                  'Previous years\' question practice',
                  'Time management strategies',
                  'Regular parent progress updates'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Student Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how our test series has helped students achieve their goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Average Score Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Pass Rate</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The regular test series helped me identify my weak areas and improve systematically. I went from 65% to 92% in mathematics!"
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">Priya Sharma</div>
                <div className="text-gray-600">Class 10, DPS School</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The test pattern and difficulty level perfectly matches the board exam. My son's confidence in math has improved significantly."
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">Mrs. Kumar</div>
                <div className="text-gray-600">Parent of Arjun Kumar</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Excel in Mathematics?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join hundreds of students who have improved their math scores through our comprehensive test series.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-blue-100">Weekly tests every Saturday & Sunday</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-blue-100">Immediate feedback and doubt clearing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-blue-100">Performance tracking and analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-blue-100">Comprehensive student dashboard with analytics</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Register Now</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Mode Preference
                  </label>
                  <select
                    name="testMode"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select preferred mode</option>
                    <option value="offline">Offline (At Center)</option>
                    <option value="online">Online (From Home)</option>
                    <option value="both">Both Options</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter student's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter parent/guardian name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Name *
                  </label>
                  <input
                    type="text"
                    name="school"
                    required
                    value={formData.school}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter school name"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Register for Test Series
                </button>
              </form>
              <p className="text-sm text-gray-600 mt-4 text-center">
                We'll contact you within 24 hours to confirm your enrollment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Tuition Center
            </h2>
            <p className="text-xl text-gray-600">
              Get in touch for more information or visit us directly
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Visit Us</h3>
              <p className="text-gray-600">
                [Your Tuition Center Address]<br />
                [City, State - PIN]<br />
                Near [Landmark]
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Call Us</h3>
              <p className="text-gray-600">
                <a href="tel:+919876543210" className="hover:text-green-600">
                  +91 98765 43210
                </a><br />
                <span className="text-sm">Mon-Fri: 9 AM - 8 PM</span><br />
                <span className="text-sm">Sat-Sun: 7 AM - 12 PM</span>
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow">
              <Mail className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Email Us</h3>
              <p className="text-gray-600">
                <a href="mailto:info@mathacetuition.com" className="hover:text-orange-600">
                  info@mathacetuition.com
                </a><br />
                <span className="text-sm">We'll respond within 24 hours</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">MathAce Test Series</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering Class 10 students to excel in CBSE Mathematics through comprehensive test series and expert guidance.
              </p>
              <div className="text-sm text-gray-400">
                © 2025 MathAce Test Series. All rights reserved.
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#schedule" className="hover:text-white transition-colors">Schedule</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
                <li><a href="#register" className="hover:text-white transition-colors">Register</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@mathacetuition.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Tests: Sat-Sun 7-10 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showStudentDashboard && (
        <StudentDashboard
          studentId="student-123"
          onClose={() => setShowStudentDashboard(false)}
        />
      )}

      {showOnlineTest && (
        <OnlineTestInterface
          testId="test-123"
          onClose={() => setShowOnlineTest(false)}
        />
      )}

      {showAdminDashboard && (
        <AdminDashboard
          onClose={() => setShowAdminDashboard(false)}
        />
      )}
    </div>
  );
}

export default App;