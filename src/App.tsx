import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ChildProvider } from './contexts/ChildContext';
import ProtectedRoute from './components/ProtectedRoute';
import ChildProtectedRoute from './components/ChildProtectedRoute';
import ParentDashboard from './pages/ParentDashboard';
import ParentLogin from './pages/ParentLogin';
import ChildLogin from './pages/ChildLogin';
import ChildDashboard from './pages/ChildDashboard';
import StoryReader from './pages/StoryReader';
import QuizPage from './pages/QuizPage';
import N8NTestPage from './pages/N8NTestPage';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <AuthProvider>
      <ChildProvider>
        <div className="App">
          <Routes>
            {/* Parent Routes */}
            <Route path="/parent/login" element={<ParentLogin />} />
            <Route 
              path="/parent/*" 
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/" element={<ParentDashboard />} />
                    <Route path="/dashboard" element={<ParentDashboard />} />
                    <Route path="/n8n-test" element={<N8NTestPage />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
            
            {/* Child Routes */}
            <Route path="/child/login" element={<ChildLogin />} />
            <Route 
              path="/child/*" 
              element={
                <ChildProtectedRoute>
                  <Routes>
                    <Route path="/dashboard" element={<ChildDashboard />} />
                    <Route path="/story/:storyId" element={<StoryReader />} />
                    <Route path="/quiz/:storyId" element={<QuizPage />} />
                  </Routes>
                </ChildProtectedRoute>
              } 
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/parent/dashboard" replace />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/parent/dashboard" replace />} />
          </Routes>
        </div>
      </ChildProvider>
    </AuthProvider>
  );
}

export default App;
