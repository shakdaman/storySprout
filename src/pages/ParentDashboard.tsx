import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Plus, 
  BarChart3, 
  Calendar,
  Star,
  Clock,
  TrendingUp,
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChild } from '../contexts/ChildContext';
import CreateChildModal from '../components/CreateChildModal';
import ChildCard from '../components/ChildCard';

const ParentDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { children, loading } = useChild();
  const [showCreateChildModal, setShowCreateChildModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

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
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user?.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span className="text-gray-700 font-medium">{user?.displayName}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.displayName?.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">
            Manage your family's reading journey and track your children's progress.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Children</p>
                <p className="text-2xl font-bold text-gray-900">{children.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Stories Read</p>
                <p className="text-2xl font-bold text-gray-900">
                  {children.reduce((total, child) => total + (child as any).storiesRead || 0, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Quiz Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {children.length > 0 ? '85%' : '0%'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reading Streak</p>
                <p className="text-2xl font-bold text-gray-900">
                  {children.length > 0 ? '7 days' : '0 days'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Children Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Your Children</h3>
              <button
                onClick={() => setShowCreateChildModal(true)}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Child
              </button>
            </div>
          </div>

          <div className="p-6">
            {children.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No children added yet</h4>
                <p className="text-gray-600 mb-4">
                  Add your first child to start their reading journey with StorySprout.
                </p>
                <button
                  onClick={() => setShowCreateChildModal(true)}
                  className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mx-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Child
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {children.map((child) => (
                  <ChildCard key={child.id} child={child} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/parent/reports"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">View Reports</h4>
                <p className="text-gray-600">Detailed progress reports and analytics</p>
              </div>
            </div>
          </Link>

          <Link
            to="/parent/settings"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-gray-600 mr-4" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Settings</h4>
                <p className="text-gray-600">Manage account and preferences</p>
              </div>
            </div>
          </Link>

          <Link
            to="/parent/calendar"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Reading Calendar</h4>
                <p className="text-gray-600">Track daily reading activities</p>
              </div>
            </div>
          </Link>
        </div>
      </main>

      {/* Create Child Modal */}
      {showCreateChildModal && (
        <CreateChildModal
          onClose={() => setShowCreateChildModal(false)}
          onSuccess={() => setShowCreateChildModal(false)}
        />
      )}
    </div>
  );
};

export default ParentDashboard;


