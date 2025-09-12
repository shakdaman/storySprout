import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Star, 
  ArrowRight,
  Volume2,
  VolumeX
} from 'lucide-react';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useChild } from '../contexts/ChildContext';
import type { Story, ReadingActivity } from '../types';

const StoryReader: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const { currentChild } = useChild();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingStartTime, setReadingStartTime] = useState<Date | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [showQuizButton, setShowQuizButton] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  useEffect(() => {
    if (storyId) {
      fetchStory();
    }
  }, [storyId]);

  const fetchStory = async () => {
    try {
      const storyRef = doc(db, 'stories', storyId!);
      const storySnap = await getDoc(storyRef);
      
      if (storySnap.exists()) {
        const data = storySnap.data();
        const storyData: Story = {
          id: storySnap.id,
          title: data.title,
          content: data.content,
          author: data.author,
          createdAt: data.createdAt?.toDate() || new Date(),
          readingLevel: data.readingLevel,
          estimatedReadingTime: data.estimatedReadingTime || 5,
          tags: data.tags || [],
          quizId: data.quizId
        };
        setStory(storyData);
      }
    } catch (error) {
      console.error('Error fetching story:', error);
    } finally {
      setLoading(false);
    }
  };

  const startReading = () => {
    setIsReading(true);
    setReadingStartTime(new Date());
    setShowQuizButton(false);
  };

  const finishReading = async () => {
    if (!currentChild || !story || !readingStartTime) return;

    try {
      const readingEndTime = new Date();
      const timeSpent = Math.floor((readingEndTime.getTime() - readingStartTime.getTime()) / 1000);

      // Record reading activity
      const activityData: Omit<ReadingActivity, 'id'> = {
        childId: currentChild.id,
        storyId: story.id,
        startedAt: readingStartTime,
        completedAt: readingEndTime,
        timeSpent,
        isCompleted: true
      };

      await addDoc(collection(db, 'readingActivities'), activityData);
      
      setIsReading(false);
      setShowQuizButton(true);
    } catch (error) {
      console.error('Error recording reading activity:', error);
    }
  };

  const toggleSpeech = () => {
    if (!story) return;

    if (speechEnabled) {
      window.speechSynthesis.cancel();
      setSpeechEnabled(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(story.content);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
      setSpeechEnabled(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 child-font">Loading story...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 child-font mb-2">Story Not Found</h2>
          <p className="text-gray-600 child-font mb-4">The story you're looking for doesn't exist.</p>
          <Link
            to="/child/dashboard"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors child-font"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              to="/child/dashboard"
              className="flex items-center text-primary-600 hover:text-primary-700 child-font"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSpeech}
                className={`p-2 rounded-lg transition-colors ${
                  speechEnabled 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {speechEnabled ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="child-font">{story.estimatedReadingTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Story Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Story Header */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
            <h1 className="text-3xl font-bold child-font mb-2">{story.title}</h1>
            <div className="flex items-center justify-between">
              <p className="child-font">By {story.author}</p>
              <div className="flex space-x-2">
                {story.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full child-font"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Story Body */}
          <div className="p-8">
            {!isReading ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 child-font mb-4">
                  Ready to start reading?
                </h3>
                <p className="text-gray-600 child-font mb-6">
                  This story will take about {story.estimatedReadingTime} minutes to read.
                </p>
                <button
                  onClick={startReading}
                  className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors child-font mx-auto"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Start Reading
                </button>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed child-font text-lg">
                  {story.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  {!showQuizButton ? (
                    <button
                      onClick={finishReading}
                      className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors child-font mx-auto"
                    >
                      <Star className="h-5 w-5 mr-2" />
                      I Finished Reading!
                    </button>
                  ) : (
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg child-font">
                          <Star className="h-5 w-5 mr-2" />
                          Great job reading!
                        </div>
                      </div>
                      {story.quizId && (
                        <Link
                          to={`/child/quiz/${story.quizId}`}
                          className="inline-flex items-center px-6 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors child-font"
                        >
                          Take Quiz
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StoryReader;

