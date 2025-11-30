import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './QuizPage.css';

const DEFAULT_QUIZ = [
  {
    id: 1,
    question: 'What is a key concept in this subject?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correct: 0
  },
  {
    id: 2,
    question: 'Which principle is fundamental to understanding this topic?',
    options: ['Principle 1', 'Principle 2', 'Principle 3', 'Principle 4'],
    correct: 1
  },
  {
    id: 3,
    question: 'What is the best practice for this subject?',
    options: ['Practice A', 'Practice B', 'Practice C', 'Practice D'],
    correct: 2
  },
  {
    id: 4,
    question: 'Which tool or method is commonly used in this field?',
    options: ['Tool A', 'Tool B', 'Tool C', 'Tool D'],
    correct: 0
  }
];

const QUIZ_DATA = {
  'Data Structures and Algorithms': [
    {
      id: 1,
      question: 'What is the time complexity of inserting an element at the end of an array?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correct: 0
    },
    {
      id: 2,
      question: 'Which data structure is best for implementing a priority queue?',
      options: ['Array', 'Linked List', 'Heap', 'Stack'],
      correct: 2
    },
    {
      id: 3,
      question: 'What is the worst-case time complexity of Quick Sort?',
      options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
      correct: 1
    },
    {
      id: 4,
      question: 'In a binary tree, what is the maximum number of nodes at level h?',
      options: ['2^h', '2^h - 1', 'h', '2h'],
      correct: 0
    }
  ],
  'Database Management Systems': [
    {
      id: 1,
      question: 'What does ACID stand for in database transactions?',
      options: [
        'Atomicity, Consistency, Isolation, Durability',
        'Access, Control, Integrity, Data',
        'Analysis, Control, Integration, Design',
        'Application, Code, Interface, Database'
      ],
      correct: 0
    },
    {
      id: 2,
      question: 'Which normal form eliminates transitive dependencies?',
      options: ['1NF', '2NF', '3NF', 'BCNF'],
      correct: 2
    },
    {
      id: 3,
      question: 'What is the purpose of an index in a database?',
      options: [
        'To store data',
        'To speed up data retrieval',
        'To backup data',
        'To encrypt data'
      ],
      correct: 1
    },
    {
      id: 4,
      question: 'Which SQL command is used to modify existing data?',
      options: ['INSERT', 'UPDATE', 'DELETE', 'ALTER'],
      correct: 1
    }
  ]
};

const QuizPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [currentQuiz, setCurrentQuiz] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const subject = state.selectedSubjects?.[parseInt(subjectId) - 1] || 'Data Structures and Algorithms';
  const quizzes = QUIZ_DATA[subject] || DEFAULT_QUIZ;
  const currentQuizData = quizzes[currentQuiz - 1];

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const handleSubmit = () => {
    const isCorrect = answers[currentQuizData.id] === currentQuizData.correct;
    const percentage = isCorrect ? 100 : 0;
    setScore(percentage);
    setShowResult(true);

    dispatch({
      type: 'SET_QUIZ_RESULT',
      payload: {
        subjectId: subject,
        quizId: currentQuiz,
        result: {
          score: percentage,
          correct: isCorrect ? 1 : 0,
          total: 1,
          date: new Date().toISOString()
        }
      }
    });
  };

  const handleNextQuiz = () => {
    if (currentQuiz < 4) {
      setCurrentQuiz(currentQuiz + 1);
      setAnswers({});
      setShowResult(false);
      setScore(0);
    } else {
      navigate('/dashboard');
    }
  };

  if (!state.selectedSubjects || state.selectedSubjects.length === 0) {
    return (
      <div className="quiz-page">
        <div className="card">
          <p>Please select subjects first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="card">
        <div className="quiz-header">
          <h1>Quiz: {subject}</h1>
          <p>Quiz {currentQuiz} of 4</p>
        </div>

        {!showResult ? (
          <div className="quiz-content">
            <div className="question-card">
              <h3>{currentQuizData.question}</h3>
              <div className="options-container">
                {currentQuizData.options.map((option, index) => (
                  <label
                    key={index}
                    className={`option-label ${
                      answers[currentQuizData.id] === index ? 'selected' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuizData.id}`}
                      value={index}
                      checked={answers[currentQuizData.id] === index}
                      onChange={() => handleAnswerChange(currentQuizData.id, index)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="quiz-footer">
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
                disabled={answers[currentQuizData.id] === undefined}
              >
                Submit Answer
              </button>
            </div>
          </div>
        ) : (
          <div className="quiz-result">
            <h2>Quiz Result</h2>
            <div className="score-display">
              <div className="score-circle">
                <span className="score-value">{score.toFixed(0)}%</span>
              </div>
              <p>
                {score === 100
                  ? 'Correct! Well done!'
                  : 'Incorrect. Better luck next time!'}
              </p>
            </div>
            <div className="result-actions">
              {currentQuiz < 4 ? (
                <button onClick={handleNextQuiz} className="btn btn-primary">
                  Next Quiz
                </button>
              ) : (
                <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
                  Back to Dashboard
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;

