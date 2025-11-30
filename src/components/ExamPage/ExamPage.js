import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './ExamPage.css';

const EXAM_QUESTIONS = [
  {
    id: 1,
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    correct: 1
  },
  {
    id: 2,
    question: 'Which data structure follows LIFO principle?',
    options: ['Queue', 'Stack', 'Array', 'Linked List'],
    correct: 1
  },
  {
    id: 3,
    question: 'What does SQL stand for?',
    options: [
      'Structured Query Language',
      'Simple Query Language',
      'Standard Query Language',
      'System Query Language'
    ],
    correct: 0
  },
  {
    id: 4,
    question: 'Which protocol is used for secure web communication?',
    options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
    correct: 2
  },
  {
    id: 5,
    question: 'What is the default port number for HTTP?',
    options: ['80', '443', '8080', '3000'],
    correct: 0
  },
  {
    id: 6,
    question: 'Which sorting algorithm has the best average time complexity?',
    options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'],
    correct: 1
  },
  {
    id: 7,
    question: 'What is the main purpose of an operating system?',
    options: [
      'To manage hardware resources',
      'To compile programs',
      'To design websites',
      'To create databases'
    ],
    correct: 0
  },
  {
    id: 8,
    question: 'Which is not a programming paradigm?',
    options: ['Object-Oriented', 'Functional', 'Procedural', 'Linear'],
    correct: 3
  },
  {
    id: 9,
    question: 'What does API stand for?',
    options: [
      'Application Programming Interface',
      'Advanced Programming Interface',
      'Application Program Integration',
      'Automated Programming Interface'
    ],
    correct: 0
  },
  {
    id: 10,
    question: 'Which language is primarily used for web development?',
    options: ['Java', 'Python', 'JavaScript', 'C++'],
    correct: 2
  },
  {
    id: 11,
    question: 'What is the purpose of version control systems like Git?',
    options: [
      'To compile code',
      'To track changes in code',
      'To run tests',
      'To deploy applications'
    ],
    correct: 1
  },
  {
    id: 12,
    question: 'Which database model is most commonly used?',
    options: ['Hierarchical', 'Network', 'Relational', 'Object-oriented'],
    correct: 2
  },
  {
    id: 13,
    question: 'What is a primary key in a database?',
    options: [
      'A foreign key',
      'A unique identifier for a record',
      'A backup key',
      'An encryption key'
    ],
    correct: 1
  },
  {
    id: 14,
    question: 'Which HTTP method is used to retrieve data?',
    options: ['POST', 'GET', 'PUT', 'DELETE'],
    correct: 1
  },
  {
    id: 15,
    question: 'What is the purpose of CSS?',
    options: [
      'To structure web pages',
      'To style web pages',
      'To add interactivity',
      'To store data'
    ],
    correct: 1
  }
];

const ExamPage = () => {
  const [answers, setAnswers] = useState({});
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const answeredCount = Object.keys(answers).length;
    
    if (answeredCount < EXAM_QUESTIONS.length) {
      alert(`Please answer all ${EXAM_QUESTIONS.length} questions before submitting.`);
      return;
    }

    dispatch({
      type: 'SET_EXAM_ANSWERS',
      payload: answers
    });

    navigate('/subjects');
  };

  const allAnswered = Object.keys(answers).length === EXAM_QUESTIONS.length;

  return (
    <div className="exam-page">
      <div className="card">
        <div className="exam-header">
          <h1>Career Assessment Exam</h1>
          <p className="exam-info">
            Please answer all {EXAM_QUESTIONS.length} questions. You have answered{' '}
            {Object.keys(answers).length} out of {EXAM_QUESTIONS.length} questions.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="questions-container">
            {EXAM_QUESTIONS.map((question, index) => (
              <div key={question.id} className="question-card">
                <div className="question-header">
                  <span className="question-number">Question {index + 1}</span>
                  {answers[question.id] !== undefined && (
                    <span className="answered-badge">Answered</span>
                  )}
                </div>
                <h3 className="question-text">{question.question}</h3>
                <div className="options-container">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`option-label ${
                        answers[question.id] === optionIndex ? 'selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={optionIndex}
                        checked={answers[question.id] === optionIndex}
                        onChange={() => handleAnswerChange(question.id, optionIndex)}
                      />
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="exam-footer">
            <button
              type="submit"
              className={`btn btn-primary ${!allAnswered ? 'btn-disabled' : ''}`}
              disabled={!allAnswered}
            >
              Submit Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamPage;





