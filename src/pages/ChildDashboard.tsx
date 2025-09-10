import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Star, 
  Trophy, 
  Calendar,
  ArrowRight,
  Sparkles,
  Clock,
  Target
} from 'lucide-react';
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useChild } from '../contexts/ChildContext';
import type { Story, Quiz } from '../types';

const ChildDashboard: React.FC = () => {
  const { currentChild } = useChild();
  const [todaysStory, setTodaysStory] = useState<Story | null>(null);
  const [todaysQuiz, setTodaysQuiz] = useState<Quiz | null>(null);
  const [recentStories, setRecentStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentChild) {
      fetchTodaysContent();
      fetchRecentStories();
    }
  }, [currentChild]);

  const fetchTodaysContent = async () => {
    try {
      // Fetch today's story
      const storiesRef = collection(db, 'stories');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const storiesQuery = query(
        storiesRef,
        where('createdAt', '>=', today),
        where('readingLevel', '==', currentChild?.preferences.readingLevel || 'beginner'),
        limit(1)
      );
      
      const storiesSnapshot = await getDocs(storiesQuery);
      if (!storiesSnapshot.empty) {
        const storyDoc = storiesSnapshot.docs[0];
        const storyData = storyDoc.data();
        setTodaysStory({
          id: storyDoc.id,
          title: storyData.title,
          content: storyData.content,
          author: storyData.author,
          createdAt: storyData.createdAt?.toDate() || new Date(),
          readingLevel: storyData.readingLevel,
          estimatedReadingTime: storyData.estimatedReadingTime || 5,
          tags: storyData.tags || [],
          quizId: storyData.quizId
        });

        // Fetch the associated quiz
        if (storyData.quizId) {
          const quizRef = doc(db, 'quizzes', storyData.quizId);
          const quizSnap = await getDoc(quizRef);
          if (quizSnap.exists()) {
            const quizData = quizSnap.data();
            setTodaysQuiz({
              id: quizSnap.id,
              storyId: storyData.quizId,
              title: quizData.title,
              questions: quizData.questions || [],
              createdAt: quizData.createdAt?.toDate() || new Date()
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching today\'s content:', error);
    }
  };

  const fetchRecentStories = async () => {
    try {
      const storiesRef = collection(db, 'stories');
      const storiesQuery = query(
        storiesRef,
        where('readingLevel', '==', currentChild?.preferences.readingLevel || 'beginner'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      
      const storiesSnapshot = await getDocs(storiesQuery);
      const stories: Story[] = [];
      
      storiesSnapshot.forEach((doc) => {
        const data = doc.data();
        stories.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          author: data.author,
          createdAt: data.createdAt?.toDate() || new Date(),
          readingLevel: data.readingLevel,
          estimatedReadingTime: data.estimatedReadingTime || 5,
          tags: data.tags || [],
          quizId: data.quizId
        });
      });
      
      setRecentStories(stories);
    } catch (error) {
      console.error('Error fetching recent stories:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock progress data
  const mockProgress = {
    totalStories: 15,
    totalQuizzes: 12,
    averageScore: 87,
    streak: 7,
    achievements: 5
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 child-font">Loading your stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-3xl mr-3">{currentChild?.avatar}</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 child-font">
                  Hi, {currentChild?.name}! 👋
                </h1>
                <p className="text-sm text-gray-600 child-font">Ready for today's adventure?</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <span className="text-lg font-bold text-gray-900 child-font">
                {mockProgress.streak}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold child-font mb-2">
                Today's Story Adventure! ✨
              </h2>
              <p className="child-font">
                {todaysStory 
                  ? `Ready to read "${todaysStory.title}"?`
                  : "No new story today, but you can read from your library!"
                }
              </p>
            </div>
            <Sparkles className="h-12 w-12 text-yellow-200" />
          </div>
        </div>

        {/* Today's Story */}
        {todaysStory && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 child-font">
                📚 Today's Story
              </h3>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>{todaysStory.estimatedReadingTime} min read</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
              <h4 className="text-lg font-semibold text-gray-900 child-font mb-2">
                {todaysStory.title}
              </h4>
              <p className="text-gray-600 child-font mb-3">
                {todaysStory.content.substring(0, 150)}...
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {todaysStory.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full child-font"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <Link
                to={`/child/story/${todaysStory.id}`}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors child-font"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Read Story
              </Link>
              {todaysQuiz && (
                <Link
                  to={`/child/quiz/${todaysQuiz.id}`}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors child-font"
                >
                  <Star className="h-5 w-5 mr-2" />
                  Take Quiz
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Progress Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 child-font">{mockProgress.totalStories}</p>
            <p className="text-sm text-gray-600 child-font">Stories Read</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 child-font">{mockProgress.totalQuizzes}</p>
            <p className="text-sm text-gray-600 child-font">Quizzes Taken</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 child-font">{mockProgress.averageScore}%</p>
            <p className="text-sm text-gray-600 child-font">Avg Score</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 child-font">{mockProgress.achievements}</p>
            <p className="text-sm text-gray-600 child-font">Achievements</p>
          </div>
        </div>

        {/* Story Library */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 child-font">
              📖 Your Story Library
            </h3>
          </div>
          
          <div className="p-6">
            {recentStories.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 child-font">No stories available yet!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentStories.map((story) => (
                  <div
                    key={story.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 child-font">{story.title}</h4>
                      <p className="text-sm text-gray-600 child-font">
                        {story.content.substring(0, 100)}...
                      </p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-xs text-gray-500 child-font">
                          {story.readingLevel}
                        </span>
                        <span className="text-xs text-gray-500 child-font">
                          {story.estimatedReadingTime} min
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/child/story/${story.id}`}
                      className="flex items-center text-primary-600 hover:text-primary-700 child-font"
                    >
                      Read <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChildDashboard;
