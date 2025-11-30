import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import './InterviewPage.css';

const InterviewPage = () => {
  const { state, dispatch } = useApp();
  const [interviews, setInterviews] = useState(state.interviews || []);

  useEffect(() => {
    // Initialize with sample data if empty
    if (interviews.length === 0) {
      const sampleInterviews = [
        {
          id: 1,
          company: 'Tech Solutions Inc.',
          position: 'Software Engineer',
          date: '2024-02-15',
          time: '10:00 AM',
          status: 'Scheduled',
          location: 'Virtual'
        },
        {
          id: 2,
          company: 'Data Analytics Corp',
          position: 'Data Scientist',
          date: '2024-02-20',
          time: '2:00 PM',
          status: 'Pending',
          location: 'On-site'
        }
      ];
      setInterviews(sampleInterviews);
      dispatch({ type: 'SET_INTERVIEWS', payload: sampleInterviews });
    }
  }, [dispatch, interviews.length]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'status-scheduled';
      case 'Pending':
        return 'status-pending';
      case 'Completed':
        return 'status-completed';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="interview-page">
      <div className="card">
        <div className="page-header">
          <h1>Interview Selected Students</h1>
          <p>View and manage your interview schedules</p>
        </div>

        {interviews.length === 0 ? (
          <div className="no-data">
            <p>No interviews scheduled yet.</p>
          </div>
        ) : (
          <div className="interviews-list">
            {interviews.map((interview) => (
              <div key={interview.id} className="interview-card">
                <div className="interview-header">
                  <h3>{interview.company}</h3>
                  <span className={`status-badge ${getStatusClass(interview.status)}`}>
                    {interview.status}
                  </span>
                </div>
                <div className="interview-details">
                  <div className="detail-item">
                    <span className="detail-label">Position:</span>
                    <span className="detail-value">{interview.position}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{interview.date}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">{interview.time}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{interview.location}</span>
                  </div>
                </div>
                <div className="interview-actions">
                  <button className="btn btn-primary">View Details</button>
                  <button className="btn btn-secondary">Reschedule</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="interview-stats">
          <div className="stat-card">
            <h3>{interviews.length}</h3>
            <p>Total Interviews</p>
          </div>
          <div className="stat-card">
            <h3>{interviews.filter((i) => i.status === 'Scheduled').length}</h3>
            <p>Scheduled</p>
          </div>
          <div className="stat-card">
            <h3>{interviews.filter((i) => i.status === 'Pending').length}</h3>
            <p>Pending</p>
          </div>
          <div className="stat-card">
            <h3>{interviews.filter((i) => i.status === 'Completed').length}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;





