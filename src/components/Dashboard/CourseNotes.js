import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './CourseNotes.css';

const CourseNotes = () => {
  const { state } = useApp();
  const [selectedSubject, setSelectedSubject] = useState(null);

  const notesContent = {
    'Data Structures and Algorithms': {
      topics: ['Arrays and Linked Lists', 'Stacks and Queues', 'Trees and Graphs', 'Sorting Algorithms'],
      notes: 'Comprehensive notes covering fundamental data structures and algorithm design principles.'
    },
    'Database Management Systems': {
      topics: ['SQL Basics', 'Normalization', 'Transactions', 'Indexing'],
      notes: 'Learn about database design, query optimization, and transaction management.'
    },
    'Computer Networks': {
      topics: ['OSI Model', 'TCP/IP', 'Network Security', 'Wireless Networks'],
      notes: 'Understanding network protocols, architecture, and security mechanisms.'
    },
    'Operating Systems': {
      topics: ['Process Management', 'Memory Management', 'File Systems', 'Scheduling'],
      notes: 'Core concepts of operating system design and resource management.'
    },
    'Software Engineering': {
      topics: ['SDLC', 'Agile Methodology', 'Testing', 'Project Management'],
      notes: 'Software development lifecycle, methodologies, and best practices.'
    }
  };

  const getNotesForSubject = (subject) => {
    return notesContent[subject] || {
      topics: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4'],
      notes: `Course notes for ${subject}. This subject covers fundamental concepts and advanced topics.`
    };
  };

  return (
    <div className="course-notes-page">
      <div className="card">
        <div className="page-header">
          <h1>Subject Course Notes</h1>
          <p>Access course materials for your selected subjects</p>
        </div>

        {!state.selectedSubjects || state.selectedSubjects.length === 0 ? (
          <div className="no-subjects">
            <p>Please select subjects first to view course notes.</p>
          </div>
        ) : (
          <div className="notes-container">
            <div className="subjects-sidebar">
              <h3>Your Subjects</h3>
              <div className="subject-list">
                {state.selectedSubjects.map((subject, index) => (
                  <button
                    key={index}
                    className={`subject-btn ${selectedSubject === subject ? 'active' : ''}`}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            <div className="notes-content">
              {selectedSubject ? (
                <div className="notes-details">
                  <h2>{selectedSubject}</h2>
                  <div className="notes-description">
                    <p>{getNotesForSubject(selectedSubject).notes}</p>
                  </div>
                  <div className="topics-section">
                    <h3>Topics Covered:</h3>
                    <ul className="topics-list">
                      {getNotesForSubject(selectedSubject).topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="notes-actions">
                    <button className="btn btn-primary">Download Notes</button>
                    <button className="btn btn-secondary">View Online</button>
                  </div>
                </div>
              ) : (
                <div className="select-subject-prompt">
                  <p>Please select a subject from the left to view its course notes.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseNotes;





