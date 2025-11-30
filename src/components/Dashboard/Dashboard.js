import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './Dashboard.css';

const Dashboard = () => {
  const { state } = useApp();

  return (
    <div className="dashboard-page">
      <div className="card">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome to your career assessment dashboard</p>
        </div>

        <div className="dashboard-grid">
          <Link to="/course-notes" className="dashboard-card">
            <div className="card-icon">📚</div>
            <h3>Subject Course Notes</h3>
            <p>Access course materials for your selected subjects</p>
          </Link>

          <Link to="/quiz" className="dashboard-card">
            <div className="card-icon">📝</div>
            <h3>Take an Exam on Completed Subject</h3>
            <p>Take quizzes on your selected subjects (4 quizzes per subject)</p>
          </Link>

          <Link to="/interviews" className="dashboard-card">
            <div className="card-icon">💼</div>
            <h3>Interview Selected Students</h3>
            <p>View and manage interview schedules</p>
          </Link>

          <Link to="/companies" className="dashboard-card">
            <div className="card-icon">🏢</div>
            <h3>No. of Companies You're Selected</h3>
            <p>View companies where you've been selected</p>
          </Link>

          <Link to="/quiz-marks" className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>Marks on the Quiz You Written in Each Subject</h3>
            <p>View your quiz performance and marks</p>
          </Link>
        </div>

        {state.selectedSubjects && state.selectedSubjects.length > 0 && (
          <div className="selected-subjects">
            <h3>Your Selected Subjects:</h3>
            <div className="subjects-list">
              {state.selectedSubjects.map((subject, index) => (
                <span key={index} className="subject-badge">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;





