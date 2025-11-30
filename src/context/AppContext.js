import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  examAnswers: [],
  selectedSubjects: [],
  quizResults: {},
  interviews: [],
  companies: [],
  courseNotes: {}
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...initialState
      };
    case 'SET_EXAM_ANSWERS':
      return {
        ...state,
        examAnswers: action.payload
      };
    case 'SET_SELECTED_SUBJECTS':
      return {
        ...state,
        selectedSubjects: action.payload
      };
    case 'SET_QUIZ_RESULT':
      return {
        ...state,
        quizResults: {
          ...state.quizResults,
          [action.payload.subjectId]: {
            ...state.quizResults[action.payload.subjectId],
            [action.payload.quizId]: action.payload.result
          }
        }
      };
    case 'SET_INTERVIEWS':
      return {
        ...state,
        interviews: action.payload
      };
    case 'SET_COMPANIES':
      return {
        ...state,
        companies: action.payload
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState, () => {
    const savedState = localStorage.getItem('appState');
    return savedState ? JSON.parse(savedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};





