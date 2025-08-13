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
  const handleTestModeSelection = (mode: 'online' | 'offline') => {
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
        <div className="apple-glass border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Calculator className="h-7 w-7 text-blue-600" />
                <span className="apple-title font-semibold text-gray-900">MathAce Test Series</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#about" className="apple-body text-gray-700 hover:text-blue-600 transition-colors">About</a>
                <a href="#schedule" className="apple-body text-gray-700 hover:text-blue-600 transition-colors">Schedule</a>
                <a href="#test-modes" className="apple-body text-gray-700 hover:text-blue-600 transition-colors">Test Modes</a>
                <a href="#benefits" className="apple-body text-gray-700 hover:text-blue-600 transition-colors">Benefits</a>
                <a href="#register" className="apple-button apple-button-primary">Register Now</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-20 apple-gradient-cool relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="apple-fade-in">
              <h1 className="apple-headline-large text-white mb-6">
                Master Class 10 
                <span className="block">CBSE Mathematics</span>
              </h1>
              <p className="apple-body-large text-blue-100 mb-8 max-w-lg">
                Join our comprehensive test series every weekend and boost your math scores with expert guidance and regular practice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#register" className="apple-button apple-button-large apple-button-primary text-center">
                  Enroll Now
                </a>
                <a href="#about" className="apple-button apple-button-large apple-button-secondary text-center">
                  Learn More
                </a>
              </div>
              <div className="flex items-center space-x-6 apple-caption text-blue-200">
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
            <div className="relative apple-scale-in">
              <div className="apple-card apple-card-elevated p-8">
                <div className="text-center mb-6">
                  <h3 className="apple-title-large text-gray-900 mb-2">CBSE Board Exam Blueprint</h3>
                  <p className="apple-body text-gray-600">Chapter-wise Question Distribution (80 Marks)</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full apple-caption">
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
                        <tr key={index}>
                          <td className="text-gray-800">{item.chapter}</td>
                          <td className="text-center text-orange-600 font-medium">{item.marks1}</td>
                          <td className="text-center text-green-600 font-medium">{item.marks2}</td>
                          <td className="text-center text-blue-600 font-medium">{item.marks3}</td>
                          <td className="text-center text-purple-600 font-medium">{item.marks4}</td>
                          <td className="text-center text-gray-900 font-semibold">{item.total}</td>
                        </tr>
                      ))}
                      <tr className="font-semibold bg-gray-50">
                        <td className="text-gray-900">Total Questions</td>
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
                  <div className="apple-caption text-gray-600">
                    <span className="font-medium">Note:</span> Internal Assessment (20 Marks) + Board Exam (80 Marks) = 100 Marks Total
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Modes Section */}
      <section id="test-modes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="apple-headline text-gray-900 mb-4">
              Choose Your Test Mode
            </h2>
            <p className="apple-body-large text-gray-600">
              Flexible options to suit your learning style and convenience
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="apple-card apple-card-elevated p-8 hover:shadow-2xl transition-all duration-500">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LocationIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="apple-title-large text-gray-900 mb-2">Offline Tests</h3>
                <p className="apple-body text-gray-600">Traditional classroom experience</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="apple-body">Every Saturday & Sunday, 7-10 AM</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="apple-body">Direct interaction with faculty</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="apple-body">Immediate doubt resolution</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="apple-body">Peer learning environment</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="apple-body">Instant result discussion</span>
                </li>
              </ul>
              <button
                onClick={() => handleTestModeSelection('offline')}
                className="w-full apple-button apple-button-primary apple-button-large"
              >
                Choose Offline Mode
              </button>
            </div>
            
            <div className="apple-card apple-card-elevated p-8 hover:shadow-2xl transition-all duration-500">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="apple-title-large text-gray-900 mb-2">Online Tests</h3>
                <p className="apple-body text-gray-600">Convenient home-based testing</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="apple-body">Take tests from home comfort</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="apple-body">Download question papers instantly</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="apple-body">Upload answer sheets easily</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="apple-body">Flexible timing within test window</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="apple-body">Digital performance tracking</span>
                </li>
              </ul>
              <button
                onClick={() => handleTestModeSelection('online')}
                className="w-full apple-button apple-button-primary apple-button-large"
              >
                Choose Online Mode
              </button>
            </div>
          </div>
          
          <div className="mt-16 apple-card apple-card-elevated p-8">
            <h3 className="apple-title-large text-center text-gray-900 mb-8">
              Chapter-wise Marking Scheme
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <h4 className="apple-body font-semibold text-blue-900 mb-2">Algebra & Functions</h4>
                <div className="apple-headline text-blue-600">25</div>
                <div className="apple-caption text-blue-700">Marks</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <h4 className="apple-body font-semibold text-green-900 mb-2">Geometry</h4>
                <div className="apple-headline text-green-600">25</div>
                <div className="apple-caption text-green-700">Marks</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <h4 className="apple-body font-semibold text-purple-900 mb-2">Trigonometry</h4>
                <div className="apple-headline text-purple-600">25</div>
                <div className="apple-caption text-purple-700">Marks</div>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-xl">
                <h4 className="apple-body font-semibold text-orange-900 mb-2">Statistics & Probability</h4>
                <div className="apple-headline text-orange-600">25</div>
                <div className="apple-caption text-orange-700">Marks</div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-3 bg-gray-100 px-8 py-4 rounded-xl">
                <span className="apple-body-large font-semibold text-gray-900">Total: 100 Marks</span>
                <span className="apple-body text-gray-600">• Duration: 3 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="apple-headline text-gray-900 mb-4">
              Why Choose Our Test Series?
            </h2>
            <p className="apple-body-large text-gray-600 max-w-3xl mx-auto">
              Our comprehensive test series is designed to help Class 10 students excel in CBSE Mathematics with regular practice and expert feedback.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="apple-card p-8 text-center">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="apple-title text-gray-900 mb-3">CBSE Aligned</h3>
              <p className="apple-body text-gray-600">
                All tests are designed according to the latest CBSE syllabus and exam pattern for Class 10 Mathematics.
              </p>
            </div>
            <div className="apple-card p-8 text-center">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="apple-title text-gray-900 mb-3">Performance Tracking</h3>
              <p className="apple-body text-gray-600">
                Comprehensive analytics dashboard with chapter-wise breakdown, progress tracking, and personalized improvement suggestions.
              </p>
            </div>
            <div className="apple-card p-8 text-center">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="apple-title text-gray-900 mb-3">Expert Guidance</h3>
              <p className="apple-body text-gray-600">
                Get personalized feedback, detailed solutions, and one-on-one doubt resolution from experienced CBSE mathematics teachers.
              </p>
            </div>
            <div className="apple-card p-8 text-center">
              <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="apple-title text-gray-900 mb-3">Data Analytics</h3>
              <p className="apple-body text-gray-600">
                Advanced analytics to track student response rates, identify learning patterns, and optimize teaching strategies.
              </p>
            </div>
            <div className="apple-card p-8 text-center">
              <UserCheck className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="apple-title text-gray-900 mb-3">Flexible Options</h3>
              <p className="apple-body text-gray-600">
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
            <h2 className="apple-headline text-gray-900 mb-4">
              Test Schedule & Format
            </h2>
            <p className="apple-body-large text-gray-600">
              Regular weekend tests to keep you exam-ready
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="apple-card p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="apple-title text-gray-900">Every Saturday & Sunday</h3>
                    <p className="apple-body text-gray-600">Consistent weekly practice</p>
                  </div>
                </div>
              </div>
              <div className="apple-card p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="apple-title text-gray-900">7:00 AM - 10:00 AM</h3>
                    <p className="apple-body text-gray-600">3-hour comprehensive tests</p>
                  </div>
                </div>
              </div>
              <div className="apple-card p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="apple-title text-gray-900">100 Marks Total</h3>
                    <p className="apple-body text-gray-600">Board exam pattern simulation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="apple-card apple-card-elevated p-8">
              <h3 className="apple-title-large text-gray-900 mb-6">What's Included</h3>
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
                    <span className="apple-body text-gray-700">{item}</span>
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
            <h2 className="apple-headline text-gray-900 mb-4">
              Student Success Stories
            </h2>
            <p className="apple-body-large text-gray-600">
              See how our test series has helped students achieve their goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="apple-headline text-blue-600 mb-2">95%</div>
              <div className="apple-body text-gray-600">Average Score Improvement</div>
            </div>
            <div className="text-center">
              <div className="apple-headline text-green-600 mb-2">200+</div>
              <div className="apple-body text-gray-600">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="apple-headline text-purple-600 mb-2">98%</div>
              <div className="apple-body text-gray-600">Pass Rate</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="apple-card p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="apple-body text-gray-700 mb-4">
                "The regular test series helped me identify my weak areas and improve systematically. I went from 65% to 92% in mathematics!"
              </p>
              <div className="apple-caption">
                <div className="font-medium text-gray-900">Priya Sharma</div>
                <div className="text-gray-600">Class 10, DPS School</div>
              </div>
            </div>
            <div className="apple-card p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="apple-body text-gray-700 mb-4">
                "The test pattern and difficulty level perfectly matches the board exam. My son's confidence in math has improved significantly."
              </p>
              <div className="apple-caption">
                <div className="font-medium text-gray-900">Mrs. Kumar</div>
                <div className="text-gray-600">Parent of Arjun Kumar</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20 apple-gradient-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="text-white apple-fade-in">
              <h2 className="apple-headline mb-6">
                Ready to Excel in Mathematics?
              </h2>
              <p className="apple-body-large text-blue-100 mb-8">
                Join hundreds of students who have improved their math scores through our comprehensive test series.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="apple-body text-blue-100">Weekly tests every Saturday & Sunday</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="apple-body text-blue-100">Immediate feedback and doubt clearing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="apple-body text-blue-100">Performance tracking and analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="apple-body text-blue-100">Comprehensive student dashboard with analytics</span>
                </div>
              </div>
            </div>
            <div className="apple-card apple-card-elevated p-8 apple-scale-in">
              <h3 className="apple-title-large text-gray-900 mb-6">Register Now</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block apple-body font-medium text-gray-700 mb-2">
                    Test Mode Preference
                  </label>
                  <select
                    name="testMode"
                    value={formData.testMode}
                    onChange={(e) => setFormData(prev => ({ ...prev, testMode: e.target.value }))}
                    className="w-full"
                  >
                    <option value="offline">Offline (At Center)</option>
                    <option value="online">Online (From Home)</option>
                  </select>
                </div>
                <div>
                  <label className="block apple-body font-medium text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter student's full name"
                  />
                </div>
                <div>
                  <label className="block apple-body font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block apple-body font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block apple-body font-medium text-gray-700 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter parent/guardian name"
                  />
                </div>
                <div>
                  <label className="block apple-body font-medium text-gray-700 mb-2">
                    School Name *
                  </label>
                  <input
                    type="text"
                    name="school"
                    required
                    value={formData.school}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter school name"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full apple-button apple-button-primary apple-button-large"
                >
                  Register for Test Series
                </button>
              </form>
              <p className="apple-caption text-gray-600 mt-4 text-center">
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
            <h2 className="apple-headline text-gray-900 mb-4">
              Visit Our Tuition Center
            </h2>
            <p className="apple-body-large text-gray-600">
              Get in touch for more information or visit us directly
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="apple-card p-8 text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="apple-title text-gray-900 mb-3">Visit Us</h3>
              <p className="apple-body text-gray-600">
                [Your Tuition Center Address]<br />
                [City, State - PIN]<br />
                Near [Landmark]
              </p>
            </div>
            <div className="apple-card p-8 text-center">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="apple-title text-gray-900 mb-3">Call Us</h3>
              <p className="apple-body text-gray-600">
                <a href="tel:+919876543210" className="hover:text-green-600 transition-colors">
                  +91 98765 43210
                </a><br />
                <span className="apple-caption">Mon-Fri: 9 AM - 8 PM</span><br />
                <span className="apple-caption">Sat-Sun: 7 AM - 12 PM</span>
              </p>
            </div>
            <div className="apple-card p-8 text-center">
              <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="apple-title text-gray-900 mb-3">Email Us</h3>
              <p className="apple-body text-gray-600">
                <a href="mailto:info@mathacetuition.com" className="hover:text-purple-600 transition-colors">
                  info@mathacetuition.com
                </a><br />
                <span className="apple-caption">We'll respond within 24 hours</span>
              </p>
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
                <Calculator className="h-8 w-8 text-blue-400" />
                <span className="apple-title font-semibold">MathAce Test Series</span>
              </div>
              <p className="apple-body text-gray-400 mb-4">
                Empowering Class 10 students to excel in CBSE Mathematics through comprehensive test series and expert guidance.
              </p>
              <div className="apple-caption text-gray-400">
                © 2025 MathAce Test Series. All rights reserved.
              </div>
            </div>
            <div>
              <h3 className="apple-title font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 apple-body text-gray-400">
                <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#schedule" className="hover:text-blue-400 transition-colors">Schedule</a></li>
                <li><a href="#benefits" className="hover:text-blue-400 transition-colors">Benefits</a></li>
                <li><a href="#register" className="hover:text-blue-400 transition-colors">Register</a></li>
              </ul>
            </div>
            <div>
              <h3 className="apple-title font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 apple-body text-gray-400">
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

    </div>
  );
}

export default App;