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
    { name: "Trigonometry", marks: 25 },
    { name: "Statistics", marks: 25 }
  ]
};
// ==========================================

// Motivational Quotes for Mathematics
const MOTIVATIONAL_QUOTES = [
  "The secret of getting marks is practice, practice and practice!",
  "Mathematics is not about numbers, equations, or algorithms: it is about understanding.",
  "Success in mathematics comes to those who are willing to work hard and never give up.",
  "Every expert was once a beginner. Every pro was once an amateur.",
  "Practice makes perfect, but perfect practice makes champions!"
];

// CBSE Class 10 Mathematics Chapter-wise Question Blueprint
const CBSE_QUESTION_BLUEPRINT = [
  { chapter: "Real Numbers", marks1: 65, marks2: 0, marks3: 2, marks4: 0, total: 999 },
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
    school: '',
    testMode: ''
  });

  const [showStudentDashboard, setShowStudentDashboard] = useState(false);
  const [showOnlineTest, setShowOnlineTest] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  // Function to scroll to registration and pre-select test mode
  const handleTestModeSelection = (mode: 'online' | 'offline' | 'fasttrack') => {
    setFormData(prev => ({ ...prev, testMode: mode }));
    // Scroll to registration section
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    setFormData({ name: '', phone: '', email: '', parentName: '', school: '', testMode: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Calculator className="h-7 w-7 text-blue-600 icon-hover" />
                <span className="text-xl font-semibold text-gray-900">MathAce Test Series</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                <a href="#schedule" className="text-gray-700 hover:text-blue-600 transition-colors">Schedule</a>
                <a href="#test-modes" className="text-gray-700 hover:text-blue-600 transition-colors">Test Modes</a>
                <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors">Benefits</a>
                <a href="#register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 button-hover">Register Now</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-20 gradient-cool relative overflow-hidden math-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="fade-in-up">
              <h1 className="text-5xl font-bold text-white mb-6">
                Master Class 10 
                <span className="block">CBSE Mathematics</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-lg">
                Join our comprehensive test series every weekend and boost your math scores with expert guidance and regular practice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#register" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-center button-hover">
                  Enroll Now
                </a>
                <a href="#about" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-center button-hover">
                  Learn More
                </a>
              </div>
              <div className="flex items-center space-x-6 text-sm text-blue-200">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-400 icon-hover" />
                  <span>Every Sat & Sun</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-400 icon-hover" />
                  <span>Small Batches</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-400 icon-hover" />
                  <span>Expert Faculty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Monitor className="h-5 w-5 text-green-400 icon-hover" />
                  <span>Online & Offline</span>
                </div>
              </div>
            </div>
            <div className="relative fade-in-up">
              <div className="bg-white rounded-xl shadow-2xl p-8 hover-pop">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">CBSE Board Exam Blueprint</h3>
                  <p className="text-gray-600">Chapter-wise Question Distribution (80 Marks)</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="text-left font-semibold text-gray-900">Chapter</th>
                        <th className="text-center font-semibold text-orange-600">1M</th>
                        <th className="text-center font-semibold text-green-600">2M</th>
                        <th className="text-center font-semibold text-blue-600">3M</th>
                        <th className="text-center font-semibold text-purple-600">4M</th>
                        <th className="text-center font-semibold text-gray-900">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CBSE_QUESTION_BLUEPRINT.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="text-gray-800 py-2 pr-4">{item.chapter}</td>
                          <td className="text-center text-orange-600 font-medium">{item.marks1}</td>
                          <td className="text-center text-green-600 font-medium">{item.marks2}</td>
                          <td className="text-center text-blue-600 font-medium">{item.marks3}</td>
                          <td className="text-center text-purple-600 font-medium">{item.marks4}</td>
                          <td className="text-center text-gray-900 font-semibold">{item.total}</td>
                        </tr>
                      ))}
                      <tr className="font-semibold bg-gray-50 border-t-2 border-gray-200">
                        <td className="text-gray-900 py-3 pr-4">Total Questions</td>
                        <td className="text-center text-orange-600">28</td>
                        <td className="text-center text-green-600">12</td>
                        <td className="text-center text-blue-600">8</td>
                        <td className="text-center text-purple-600">3</td>
                        <td className="text-center text-gray-900">80</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Note:</span> Internal Assessment (20 Marks) + Board Exam (80 Marks) = 100 Marks Total
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Modes Section */}
      <section id="test-modes" className="py-20 bg-gray-50 math-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Test Mode
            </h2>
            <p className="text-xl text-gray-600">
              Flexible options to suit your learning style and convenience
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 card-hover">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 hover-pop">
                  <LocationIcon className="h-8 w-8 text-blue-600 icon-hover" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Offline Tests</h3>
                <p className="text-gray-600">Traditional classroom experience</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 icon-hover" />
                  <span>Every Saturday & Sunday, 7-10 AM</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 icon-hover" />
                  <span>Direct interaction with faculty</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 icon-hover" />
                  <span>Immediate doubt resolution</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 icon-hover" />
                  <span>Peer learning environment</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 icon-hover" />
                  <span>Instant result discussion</span>
                </li>
              </ul>
              <button
                onClick={() => handleTestModeSelection('offline')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold button-hover"
              >
                Choose Offline Mode
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 card-hover">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 hover-pop">
                  <Monitor className="h-8 w-8 text-purple-600 icon-hover" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Online Tests</h3>
                <p className="text-gray-600">Convenient home-based testing</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 icon-hover" />
                  <span>Take tests from home comfort</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 icon-hover" />
                  <span>Download question papers instantly</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 icon-hover" />
                  <span>Upload answer sheets easily</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 icon-hover" />
                  <span>Flexible timing within test window</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 icon-hover" />
                  <span>Digital performance tracking</span>
                </li>
              </ul>
              <button
                onClick={() => handleTestModeSelection('online')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold button-hover"
              >
                Choose Online Mode
              </button>
            </div>
          </div>
          
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 hover-pop">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Chapter-wise Marking Scheme
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl hover-pop">
                <h4 className="font-semibold text-blue-900 mb-2">Algebra & Functions</h4>
                <div className="text-3xl font-bold text-blue-600">25</div>
                <div className="text-sm text-blue-700">Marks</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl hover-pop">
                <h4 className="font-semibold text-green-900 mb-2">Geometry</h4>
                <div className="text-3xl font-bold text-green-600">25</div>
                <div className="text-sm text-green-700">Marks</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl hover-pop">
                <h4 className="font-semibold text-purple-900 mb-2">Trigonometry</h4>
                <div className="text-3xl font-bold text-purple-600">25</div>
                <div className="text-sm text-purple-700">Marks</div>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-xl hover-pop">
                <h4 className="font-semibold text-orange-900 mb-2">Statistics & Probability</h4>
                <div className="text-3xl font-bold text-orange-600">25</div>
                <div className="text-sm text-orange-700">Marks</div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-3 bg-gray-100 px-8 py-4 rounded-xl">
                <span className="text-lg font-semibold text-gray-900">Total: 100 Marks</span>
                <span className="text-gray-600">• Duration: 3 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white math-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Test Series?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive test series is designed to help Class 10 students excel in CBSE Mathematics with regular practice and expert feedback.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center card-hover">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4 icon-hover" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">CBSE Aligned</h3>
              <p className="text-gray-600">
                All tests are designed according to the latest CBSE syllabus and exam pattern for Class 10 Mathematics.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center card-hover">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4 icon-hover" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Performance Tracking</h3>
              <p className="text-gray-600">
                Comprehensive analytics dashboard with chapter-wise breakdown, progress tracking, and personalized improvement suggestions.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center card-hover">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4 icon-hover" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Get personalized feedback, detailed solutions, and one-on-one doubt resolution from experienced CBSE mathematics teachers.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center card-hover">
              <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4 icon-hover" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data Analytics</h3>
              <p className="text-gray-600">
                Advanced analytics to track student response rates, identify learning patterns, and optimize teaching strategies.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center card-hover">
              <UserCheck className="h-12 w-12 text-red-600 mx-auto mb-4 icon-hover" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Options</h3>
              <p className="text-gray-600">
                Choose between online and offline test modes based on your convenience and learning preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Test Schedule & Format
            </h2>
            <p className="text-xl text-gray-600">
              Regular weekend tests to keep you exam-ready
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover-pop">
                <div className="flex items-center space-x-4 mb-4">
                  <Calendar className="h-8 w-8 text-blue-600 icon-hover" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Every Saturday & Sunday</h3>
                    <p className="text-gray-600">Consistent weekly practice</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 hover-pop">
                <div className="flex items-center space-x-4 mb-4">
                  <Clock className="h-8 w-8 text-green-600 icon-hover" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">7:00 AM - 10:00 AM</h3>
                    <p className="text-gray-600">3-hour comprehensive tests</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 hover-pop">
                <div className="flex items-center space-x-4 mb-4">
                  <Award className="h-8 w-8 text-purple-600 icon-hover" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">100 Marks Total</h3>
                    <p className="text-gray-600">Board exam pattern simulation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-2xl p-8 card-hover">
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
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0 icon-hover" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
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
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Pass Rate</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 card-hover">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current icon-hover" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The regular test series helped me identify my weak areas and improve systematically. I went from 65% to 92% in mathematics!"
              </p>
              <div className="text-sm">
                <div className="font-medium text-gray-900">Priya Sharma</div>
                <div className="text-gray-600">Class 10, DPS School</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 card-hover">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current icon-hover" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The test pattern and difficulty level perfectly matches the board exam. My son's confidence in math has improved significantly."
              </p>
              <div className="text-sm">
                <div className="font-medium text-gray-900">Mrs. Kumar</div>
                <div className="text-gray-600">Parent of Arjun Kumar</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20 gradient-cool relative overflow-hidden math-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="text-white fade-in-up">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Excel in Mathematics?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join hundreds of students who have improved their math scores through our comprehensive test series.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 icon-hover" />
                  <span className="text-blue-100">Weekly tests every Saturday & Sunday</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 icon-hover" />
                  <span className="text-blue-100">Immediate feedback and doubt clearing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 icon-hover" />
                  <span className="text-blue-100">Performance tracking and analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 icon-hover" />
                  <span className="text-blue-100">Comprehensive student dashboard with analytics</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-2xl p-8 fade-in-up">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Register Now</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Test Mode Preference
                  </label>
                  <select
                    name="testMode"
                    value={formData.testMode}
                    onChange={(e) => setFormData(prev => ({ ...prev, testMode: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select your preference</option>
                    <option value="offline">Offline (At Center)</option>
                    <option value="online">Online (From Home)</option>
                    <option value="fasttrack">FastTrack Course (Sat-Sun 4:30-7:30 PM)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter student's full name"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter parent/guardian name"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    School Name *
                  </label>
                  <input
                    type="text"
                    name="school"
                    required
                    value={formData.school}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter school name"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold button-hover"
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Visit Our Tuition Center
            </h2>
            <p className="text-xl text-gray-600">
              Get in touch for more information or visit us directly
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center card-hover">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4 icon-hover" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Us</h3>
              <p className="text-gray-600">
                Tirumala Residency<br />
                Hulimangala Main Road<br />
                Electronic City, Bangalore - 560105<br />
                Karnataka, India
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center card-hover">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4 icon-hover" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
              <p className="text-gray-600">
                <a href="tel:+919876543210" className="hover:text-green-600 transition-colors">
                  +91 98765 43210
                </a><br />
                <span className="text-sm">Mon-Fri: 9 AM - 8 PM</span><br />
                <span className="text-sm">Sat-Sun: 7 AM - 12 PM</span>
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center card-hover">
              <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4 icon-hover" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
              <p className="text-gray-600">
                <a href="mailto:info@mathacetuition.com" className="hover:text-purple-600 transition-colors">
                  info@mathacetuition.com
                </a><br />
                <span className="text-sm">We'll respond within 24 hours</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Location Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Find Us on Map
            </h2>
            <p className="text-xl text-gray-600">
              Located in the heart of Electronic City, Bangalore
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-8 card-hover">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-8 w-8 text-blue-600 mt-1 icon-hover" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">MathAce Test Series</h3>
                    <div className="space-y-2 text-gray-700">
                      <p className="font-semibold">📍 Complete Address:</p>
                      <p>Tirumala Residency</p>
                      <p>Hulimangala Main Road</p>
                      <p>Electronic City, Bangalore - 560105</p>
                      <p>Karnataka, India</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 card-hover">
                <h4 className="font-bold text-green-900 mb-3">🚗 How to Reach:</h4>
                <ul className="space-y-2 text-green-800">
                  <li>• 5 minutes from Electronic City Metro Station</li>
                  <li>• Near Infosys, TCS, and other IT companies</li>
                  <li>• Well connected by BMTC buses</li>
                  <li>• Ample parking space available</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-xl p-6 card-hover">
                <h4 className="font-bold text-orange-900 mb-3">⏰ Visit Timings:</h4>
                <div className="space-y-2 text-orange-800">
                  <p><strong>Test Days:</strong> Saturday & Sunday (7:00 AM - 10:00 AM)</p>
                  <p><strong>FastTrack Batch:</strong> Saturday & Sunday (4:30 PM - 7:30 PM)</p>
                  <p><strong>Counseling:</strong> Monday to Friday (9:00 AM - 8:00 PM)</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden card-hover">
              <div className="bg-blue-600 text-white p-4 text-center">
                <h3 className="text-xl font-bold">📍 Our Location</h3>
                <p className="text-blue-100">Electronic City, Bangalore</p>
              </div>
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.0234567890123!2d77.6648!3d12.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzQ0LjIiTiA3N8KwMzknNTMuMyJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MathAce Test Series Location - Electronic City, Bangalore"
                  className="w-full"
                ></iframe>
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-900">MathAce Test Series</span>
                  </div>
                  <p className="text-xs text-gray-600">Electronic City, Bangalore</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">+91 98765 43210</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Tirumala+Residency+Hulimangala+Main+Road+Electronic+City+Bangalore+560105"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors button-hover"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-8 w-8 text-blue-400 icon-hover" />
                <span className="text-xl font-semibold">MathAce Test Series</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering Class 10 students to excel in CBSE Mathematics through comprehensive test series and expert guidance.
              </p>
              <div className="text-sm text-gray-400">
                © 2025 MathAce Test Series. All rights reserved.
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#schedule" className="hover:text-blue-400 transition-colors">Schedule</a></li>
                <li><a href="#benefits" className="hover:text-blue-400 transition-colors">Benefits</a></li>
                <li><a href="#register" className="hover:text-blue-400 transition-colors">Register</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 icon-hover" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 icon-hover" />
                  <span>info@mathacetuition.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 icon-hover" />
                  <span>Tests: Sat-Sun 7-10 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;