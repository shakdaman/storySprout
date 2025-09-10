import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ChildProvider } from './contexts/ChildContext';
import LandingPage from './pages/LandingPage';
import ParentLogin from './pages/ParentLogin';
import ParentDashboard from './pages/ParentDashboard';
import ChildLogin from './pages/ChildLogin';
import ChildDashboard from './pages/ChildDashboard';
import StoryReader from './pages/StoryReader';
import QuizPage from './pages/QuizPage';
import ProtectedRoute from './components/ProtectedRoute';
import ChildProtectedRoute from './components/ChildProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <AuthProvider>
      <ChildProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/parent/login" element={<ParentLogin />} />
              <Route path="/child/login" element={<ChildLogin />} />
              
              {/* Protected Parent Routes */}
              <Route 
                path="/parent/dashboard" 
                element={
                  <ProtectedRoute>
                    <ParentDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Child Routes */}
              <Route 
                path="/child/dashboard" 
                element={
                  <ChildProtectedRoute>
                    <ChildDashboard />
                  </ChildProtectedRoute>
                } 
              />
              <Route 
                path="/child/story/:storyId" 
                element={
                  <ChildProtectedRoute>
                    <StoryReader />
                  </ChildProtectedRoute>
                } 
              />
              <Route 
                path="/child/quiz/:quizId" 
                element={
                  <ChildProtectedRoute>
                    <QuizPage />
                  </ChildProtectedRoute>
                } 
              />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </ChildProvider>
    </AuthProvider>
  );
}

export default App;
