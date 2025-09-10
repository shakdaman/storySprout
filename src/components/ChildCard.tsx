import * as React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, Calendar, TrendingUp } from 'lucide-react';
import type { Child } from '../types';

interface ChildCardProps {
  child: Child;
}

const ChildCard: React.FC<ChildCardProps> = ({ child }) => {
  // Mock data - in real app, this would come from the child's progress
  const mockProgress = {
    storiesRead: Math.floor(Math.random() * 20) + 5,
    averageScore: Math.floor(Math.random() * 30) + 70,
    streak: Math.floor(Math.random() * 15) + 1,
    lastActivity: '2 hours ago'
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-4">
          <div className="text-4xl mr-4">{child.avatar}</div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{child.name}</h4>
            <p className="text-sm text-gray-600">@{child.username}</p>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <BookOpen className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-sm text-gray-600">Stories</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{mockProgress.storiesRead}</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="h-4 w-4 text-yellow-600 mr-1" />
              <span className="text-sm text-gray-600">Avg Score</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{mockProgress.averageScore}%</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <TrendingUp className="h-4 w-4 mr-2" />
            <span>{mockProgress.streak} day streak</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Last active: {mockProgress.lastActivity}</span>
          </div>
        </div>

        {/* Reading Level Badge */}
        <div className="mb-4">
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            child.preferences.readingLevel === 'beginner' 
              ? 'bg-green-100 text-green-800'
              : child.preferences.readingLevel === 'intermediate'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {child.preferences.readingLevel.charAt(0).toUpperCase() + child.preferences.readingLevel.slice(1)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            to={`/parent/child/${child.id}/progress`}
            className="flex-1 text-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            View Progress
          </Link>
          <Link
            to={`/parent/child/${child.id}/settings`}
            className="flex-1 text-center px-3 py-2 text-sm bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChildCard;
