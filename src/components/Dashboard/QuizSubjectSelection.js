import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './QuizSubjectSelection.css';

const QuizSubjectSelection = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  if (!state.selectedSubjects || state.selectedSubjects.length === 0) {
    return (
      <div className="quiz-subject-selection-page">
        <div className="card">
          <p>Please select subjects first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-subject-selection-page">
      <div className="card">
        <div className="page-header">
          <h1>Select Subject for Quiz</h1>
          <p>Choose a subject to take a quiz on</p>
        </div>

        <div className="subjects-grid">
          {state.selectedSubjects.map((subject, index) => (
            <div
              key={index}
              className="subject-card"
              onClick={() => navigate(`/quiz/${index + 1}`)}
            >
              <div className="subject-icon">📝</div>
              <h3>{subject}</h3>
              <p>Take 4 quizzes on this subject</p>
              <button className="btn btn-primary">Start Quiz</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizSubjectSelection;





