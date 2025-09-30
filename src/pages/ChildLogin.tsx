import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, User, Lock } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useChild } from '../contexts/ChildContext';
import type { Child } from '../types';

const ChildLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setCurrentChild } = useChild();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !pin.trim()) {
      setError('Please enter both username and PIN');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Query for child with matching username and PIN
      const childrenRef = collection(db, 'children');
      const q = query(
        childrenRef,
        where('username', '==', username.trim().toLowerCase()),
        where('pin', '==', pin.trim())
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setError('Invalid username or PIN. Please try again.');
        return;
      }

      // Get the first matching child
      const childDoc = querySnapshot.docs[0];
      const childData = childDoc.data();
      
      const child: Child = {
        id: childDoc.id,
        parentId: childData.parentId,
        name: childData.name,
        username: childData.username,
        pin: childData.pin,
        avatar: childData.avatar,
        createdAt: childData.createdAt?.toDate() || new Date(),
        preferences: childData.preferences || {
          readingLevel: 'beginner',
          interests: []
        }
      };

      setCurrentChild(child);
      navigate('/child/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-12 w-12 text-secondary-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 child-font">StorySprout</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2 child-font">Child Login</h2>
          <p className="text-gray-600 child-font">
            Enter your username and PIN to start reading!
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm child-font">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2 child-font">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg child-font"
                  placeholder="Enter your username"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2 child-font">
                PIN
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="pin"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg child-font"
                  placeholder="Enter your PIN"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 disabled:opacity-50 disabled:cursor-not-allowed child-font"
            >
              {loading ? 'Signing In...' : 'Start Reading!'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 child-font">
              Ask your parent if you need help with your login information.
            </p>
          </div>
        </div>

        {/* Parent Login Link */}
        <div className="text-center">
          <p className="text-gray-600 child-font">
            Are you a parent?{' '}
            <Link to="/parent/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Parent Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChildLogin;


