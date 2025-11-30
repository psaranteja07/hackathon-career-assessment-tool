import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './QuizMarksPage.css';

const QuizMarksPage = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  const quizResults = state.quizResults || {};

  const getSubjectResults = (subject) => {
    const results = quizResults[subject] || {};
    const quizzes = [];
    for (let i = 1; i <= 4; i++) {
      if (results[i]) {
        quizzes.push({ quizId: i, ...results[i] });
      }
    }
    return quizzes;
  };

  const calculateAverage = (subject) => {
    const results = getSubjectResults(subject);
    if (results.length === 0) return 0;
    const sum = results.reduce((acc, r) => acc + r.score, 0);
    return sum / results.length;
  };

  const getGrade = (score) => {
    if (score >= 90) return { grade: 'A+', color: '#27ae60' };
    if (score >= 80) return { grade: 'A', color: '#2ecc71' };
    if (score >= 70) return { grade: 'B+', color: '#3498db' };
    if (score >= 60) return { grade: 'B', color: '#f39c12' };
    if (score >= 50) return { grade: 'C', color: '#e67e22' };
    return { grade: 'F', color: '#e74c3c' };
  };

  return (
    <div className="quiz-marks-page">
      <div className="card">
        <div className="page-header">
          <h1>Quiz Marks</h1>
          <p>View your quiz performance and marks for each subject</p>
        </div>

        {!state.selectedSubjects || state.selectedSubjects.length === 0 ? (
          <div className="no-subjects">
            <p>Please select subjects first to view quiz marks.</p>
          </div>
        ) : (
          <div className="marks-container">
            {state.selectedSubjects.map((subject, index) => {
              const subjectResults = getSubjectResults(subject);
              const average = calculateAverage(subject);
              const gradeInfo = getGrade(average);

              return (
                <div key={index} className="subject-marks-card">
                  <div className="subject-header">
                    <h3>{subject}</h3>
                    <div className="subject-average">
                      <span className="average-label">Average:</span>
                      <span className="average-score">{average.toFixed(1)}%</span>
                      <span className="grade-badge" style={{ backgroundColor: gradeInfo.color }}>
                        {gradeInfo.grade}
                      </span>
                    </div>
                  </div>

                  {subjectResults.length === 0 ? (
                    <div className="no-quizzes">
                      <p>No quizzes completed yet for this subject.</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/quiz/${index + 1}`)}
                      >
                        Take Quiz
                      </button>
                    </div>
                  ) : (
                    <div className="quizzes-list">
                      {subjectResults.map((result) => {
                        const quizGrade = getGrade(result.score);
                        return (
                          <div key={result.quizId} className="quiz-result-item">
                            <div className="quiz-info">
                              <span className="quiz-name">Quiz {result.quizId}</span>
                              <span className="quiz-date">
                                {new Date(result.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="quiz-score">
                              <div className="score-details">
                                <span className="score-value">{result.score.toFixed(1)}%</span>
                                <span
                                  className="score-grade"
                                  style={{ color: quizGrade.color }}
                                >
                                  {quizGrade.grade}
                                </span>
                              </div>
                              <div className="score-breakdown">
                                {result.correct} / {result.total} correct
                              </div>
                            </div>
                            <div
                              className="score-bar"
                              style={{
                                width: `${result.score}%`,
                                backgroundColor: quizGrade.color
                              }}
                            ></div>
                          </div>
                        );
                      })}
                      {subjectResults.length < 4 && (
                        <div className="take-more-quizzes">
                          <button
                            className="btn btn-secondary"
                            onClick={() => navigate(`/quiz/${index + 1}`)}
                          >
                            Take More Quizzes
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizMarksPage;





