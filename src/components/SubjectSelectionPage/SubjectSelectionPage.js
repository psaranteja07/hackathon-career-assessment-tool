import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './SubjectSelectionPage.css';

const ALL_SUBJECTS = [
  'Data Structures and Algorithms',
  'Database Management Systems',
  'Computer Networks',
  'Operating Systems',
  'Software Engineering',
  'Web Development',
  'Mobile App Development',
  'Machine Learning',
  'Artificial Intelligence',
  'Cloud Computing',
  'Cybersecurity',
  'Blockchain Technology',
  'Internet of Things (IoT)',
  'Computer Graphics',
  'Compiler Design',
  'Distributed Systems',
  'Data Science',
  'Big Data Analytics',
  'Human-Computer Interaction',
  'Project Management'
];

const SubjectSelectionPage = () => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleSubjectToggle = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      if (selectedSubjects.length < 5) {
        setSelectedSubjects([...selectedSubjects, subject]);
      } else {
        alert('You can only select 5 subjects. Please deselect one first.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSubjects.length !== 5) {
      alert('Please select exactly 5 subjects to continue.');
      return;
    }

    dispatch({
      type: 'SET_SELECTED_SUBJECTS',
      payload: selectedSubjects
    });

    navigate('/dashboard');
  };

  return (
    <div className="subject-selection-page">
      <div className="card">
        <div className="selection-header">
          <h1>Select Your Subjects</h1>
          <p className="selection-info">
            Please select exactly 5 subjects from the list below. You have selected{' '}
            {selectedSubjects.length} out of 5 subjects.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="subjects-grid">
            {ALL_SUBJECTS.map((subject, index) => {
              const isSelected = selectedSubjects.includes(subject);
              return (
                <div
                  key={index}
                  className={`subject-card ${isSelected ? 'selected' : ''} ${
                    !isSelected && selectedSubjects.length >= 5 ? 'disabled' : ''
                  }`}
                  onClick={() => handleSubjectToggle(subject)}
                >
                  <div className="subject-checkbox">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSubjectToggle(subject)}
                      disabled={!isSelected && selectedSubjects.length >= 5}
                    />
                    <span className="checkmark"></span>
                  </div>
                  <span className="subject-name">{subject}</span>
                </div>
              );
            })}
          </div>

          <div className="selection-footer">
            <button
              type="submit"
              className={`btn btn-primary ${
                selectedSubjects.length !== 5 ? 'btn-disabled' : ''
              }`}
              disabled={selectedSubjects.length !== 5}
            >
              Continue to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectSelectionPage;





