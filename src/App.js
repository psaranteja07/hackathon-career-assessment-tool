import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LoginPage from './components/LoginPage/LoginPage';
import ExamPage from './components/ExamPage/ExamPage';
import SubjectSelectionPage from './components/SubjectSelectionPage/SubjectSelectionPage';
import Dashboard from './components/Dashboard/Dashboard';
import CourseNotes from './components/Dashboard/CourseNotes';
import QuizSubjectSelection from './components/Dashboard/QuizSubjectSelection';
import QuizPage from './components/Dashboard/QuizPage';
import InterviewPage from './components/Dashboard/InterviewPage';
import CompaniesPage from './components/Dashboard/CompaniesPage';
import QuizMarksPage from './components/Dashboard/QuizMarksPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Navigation from './components/Navigation/Navigation';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/exam"
              element={
                <ProtectedRoute>
                  <Navigation />
                  <ExamPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subjects"
              element={
                <ProtectedRoute>
                  <Navigation />
                  <SubjectSelectionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Navigation />
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course-notes"
              element={
                <ProtectedRoute>
                  <Navigation />
                  <CourseNotes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute>
                  <Navigation />
                  <QuizSubjectSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:subjectId"
              element={
                <ProtectedRoute>
                  <Navigation />
                  <QuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interviews"
              element={
                <ProtectedRoute>
                  <Navigation />
                  <InterviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/companies"
              element={
                <ProtectedRoute>
                  <Navigation />
                  <CompaniesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz-marks"
              element={
                <ProtectedRoute>
                  <Navigation />
                  <QuizMarksPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

