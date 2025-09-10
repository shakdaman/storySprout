import * as React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Star, Shield } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">StorySprout</h1>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/parent/login"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Parent Login
              </Link>
              <Link
                to="/child/login"
                className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors"
              >
                Child Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Growing Young Readers, One Story at a Time
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            StorySprout delivers daily AI-generated stories and quizzes to children in a safe, 
            engaging environment that parents can monitor and manage.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/parent/login"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/child/login"
              className="bg-secondary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-secondary-700 transition-colors"
            >
              Read Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Choose StorySprout?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Daily Stories</h3>
              <p className="text-gray-600">
                Fresh AI-generated stories delivered every day, tailored to your child's reading level.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Quizzes</h3>
              <p className="text-gray-600">
                Engaging quizzes that test comprehension and provide instant feedback.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Family Management</h3>
              <p className="text-gray-600">
                Parents can easily manage multiple children and track their reading progress.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                Secure authentication and child-safe environment with parental controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-primary-400 mr-2" />
            <span className="text-xl font-bold">StorySprout</span>
          </div>
          <p className="text-gray-400">
            Fostering a love of reading in children through AI-powered storytelling.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
