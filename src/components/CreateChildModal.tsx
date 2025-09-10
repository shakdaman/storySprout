import * as React from 'react';
import { useState } from 'react';
import { X, User, Lock, Palette, BookOpen } from 'lucide-react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import type { CreateChildForm } from '../types';

interface CreateChildModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const avatars = [
  '🐻', '🐰', '🦊', '🐸', '🐨', '🐯', '🦁', '🐮',
  '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆'
];

const CreateChildModal: React.FC<CreateChildModalProps> = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<CreateChildForm>({
    name: '',
    username: '',
    pin: '',
    avatar: '🐻',
    readingLevel: 'beginner',
    interests: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const interests = [
    'Adventure', 'Animals', 'Magic', 'Space', 'Princesses', 'Superheroes',
    'Dinosaurs', 'Robots', 'Nature', 'Sports', 'Music', 'Art'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to create a child profile');
      return;
    }

    if (!formData.name.trim() || !formData.username.trim() || !formData.pin.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.pin.length < 4) {
      setError('PIN must be at least 4 characters long');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Create child document
      const childData = {
        parentId: user.id,
        name: formData.name.trim(),
        username: formData.username.trim().toLowerCase(),
        pin: formData.pin.trim(),
        avatar: formData.avatar,
        createdAt: new Date(),
        preferences: {
          readingLevel: formData.readingLevel,
          interests: formData.interests
        }
      };

      const childRef = await addDoc(collection(db, 'children'), childData);

      // Update parent document to include new child
      const parentRef = doc(db, 'parents', user.id);
      await updateDoc(parentRef, {
        children: [...user.children, childRef.id]
      });

      onSuccess();
    } catch (error) {
      console.error('Error creating child:', error);
      setError('Failed to create child profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Add New Child</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Child's Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter child's name"
                required
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Choose a username"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This will be used for child login along with their PIN
            </p>
          </div>

          {/* PIN */}
          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
              PIN *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="pin"
                type="password"
                value={formData.pin}
                onChange={(e) => setFormData(prev => ({ ...prev, pin: e.target.value }))}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Create a 4+ character PIN"
                minLength={4}
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Choose a PIN your child can remember
            </p>
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Avatar
            </label>
            <div className="grid grid-cols-8 gap-2">
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, avatar }))}
                  className={`p-2 rounded-lg border-2 text-2xl ${
                    formData.avatar === avatar
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          {/* Reading Level */}
          <div>
            <label htmlFor="readingLevel" className="block text-sm font-medium text-gray-700 mb-2">
              Reading Level
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="readingLevel"
                value={formData.readingLevel}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  readingLevel: e.target.value as 'beginner' | 'intermediate' | 'advanced'
                }))}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interests (Optional)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-2 text-sm rounded-lg border ${
                    formData.interests.includes(interest)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChildModal;
