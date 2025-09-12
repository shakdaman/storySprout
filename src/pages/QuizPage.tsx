import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Trophy,
  Target
} from 'lucide-react';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useChild } from '../contexts/ChildContext';
import type { Quiz, QuizResult, QuizQuestion } from '../types';

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { currentChild } = useChild();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && startTime && !quizCompleted) {
      interval = setInterval(() => {
        setTimeSpent(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, startTime, quizCompleted]);

  const fetchQuiz = async () => {
    try {
      const quizRef = doc(db, 'quizzes', quizId!);
      const quizSnap = await getDoc(quizRef);
      
      if (quizSnap.exists()) {
        const data = quizSnap.data();
        const quizData: Quiz = {
          id: quizSnap.id,
          storyId: data.storyId,
          title: data.title,
          questions: data.questions || [],
          createdAt: data.createdAt?.toDate() || new Date()
        };
        setQuiz(quizData);
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setStartTime(new Date());
    setSelectedAnswers(new Array(quiz?.questions.length || 0).fill(-1));
  };

  const selectAnswer = (questionIndex: number, answerIndex: number) => {
    if (!quizStarted || quizCompleted) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    if (!quiz || !currentChild || !startTime) return;

    try {
      // Calculate score
      let correctAnswers = 0;
      quiz.questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      });

      const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
      setScore(finalScore);
      setQuizCompleted(true);

      // Record quiz result
      const quizResult: Omit<QuizResult, 'id'> = {
        childId: currentChild.id,
        quizId: quiz.id,
        storyId: quiz.storyId,
        answers: selectedAnswers,
        score: finalScore,
        totalQuestions: quiz.questions.length,
        completedAt: new Date(),
        timeSpent
      };

      await addDoc(collection(db, 'quizResults'), quizResult);
    } catch (error) {
      console.error('Error recording quiz result:', error);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizStarted(false);
    setQuizCompleted(false);
    setScore(0);
    setTimeSpent(0);
    setStartTime(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 child-font">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 child-font mb-2">Quiz Not Found</h2>
          <p className="text-gray-600 child-font mb-4">The quiz you're looking for doesn't exist.</p>
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

  const currentQuestion = quiz.questions[currentQuestionIndex];

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
            
            {quizStarted && !quizCompleted && (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600 child-font">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </div>
                <div className="text-sm text-gray-600 child-font">
                  Time: {formatTime(timeSpent)}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Quiz Header */}
          <div className="bg-gradient-to-r from-secondary-500 to-primary-500 p-6 text-white">
            <h1 className="text-3xl font-bold child-font mb-2">{quiz.title}</h1>
            <p className="child-font">
              {quiz.questions.length} questions • Test your understanding!
            </p>
          </div>

          <div className="p-8">
            {!quizStarted ? (
              <div className="text-center py-12">
                <Star className="h-16 w-16 text-secondary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 child-font mb-4">
                  Ready for the quiz?
                </h3>
                <p className="text-gray-600 child-font mb-6">
                  This quiz has {quiz.questions.length} questions about the story you just read.
                </p>
                <button
                  onClick={startQuiz}
                  className="flex items-center px-6 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors child-font mx-auto"
                >
                  <Star className="h-5 w-5 mr-2" />
                  Start Quiz
                </button>
              </div>
            ) : quizCompleted ? (
              <div className="text-center py-12">
                <div className="mb-6">
                  {score >= 80 ? (
                    <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
                  ) : score >= 60 ? (
                    <Target className="h-20 w-20 text-green-500 mx-auto mb-4" />
                  ) : (
                    <Star className="h-20 w-20 text-blue-500 mx-auto mb-4" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 child-font mb-2">
                  {score >= 80 ? 'Excellent Work!' : score >= 60 ? 'Good Job!' : 'Keep Practicing!'}
                </h3>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
                  <div className="text-4xl font-bold text-gray-900 child-font mb-2">
                    {score}%
                  </div>
                  <p className="text-gray-600 child-font">
                    You got {Math.round((score / 100) * quiz.questions.length)} out of {quiz.questions.length} questions correct!
                  </p>
                  <p className="text-sm text-gray-500 child-font mt-2">
                    Time taken: {formatTime(timeSpent)}
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={resetQuiz}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors child-font"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </button>
                  <Link
                    to="/child/dashboard"
                    className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors child-font"
                  >
                    Back to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 child-font mb-4">
                    Question {currentQuestionIndex + 1}
                  </h3>
                  <p className="text-lg text-gray-800 child-font mb-6">
                    {currentQuestion.question}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => selectAnswer(currentQuestionIndex, index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-colors child-font ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="font-medium mr-2">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600 child-font">
                    {selectedAnswers[currentQuestionIndex] !== -1 ? 'Answer selected ✓' : 'Select an answer'}
                  </div>
                  
                  <button
                    onClick={nextQuestion}
                    disabled={selectedAnswers[currentQuestionIndex] === -1}
                    className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors child-font disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;

