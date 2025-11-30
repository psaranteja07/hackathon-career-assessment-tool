import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import './CompaniesPage.css';

const CompaniesPage = () => {
  const { state, dispatch } = useApp();
  const [companies, setCompanies] = useState(state.companies || []);

  useEffect(() => {
    // Initialize with sample data if empty
    if (companies.length === 0) {
      const sampleCompanies = [
        {
          id: 1,
          name: 'Tech Solutions Inc.',
          position: 'Software Engineer',
          status: 'Selected',
          date: '2024-02-10',
          package: '$80,000/year'
        },
        {
          id: 2,
          name: 'Data Analytics Corp',
          position: 'Data Scientist',
          status: 'Selected',
          date: '2024-02-12',
          package: '$95,000/year'
        },
        {
          id: 3,
          name: 'Cloud Services Ltd',
          position: 'Cloud Engineer',
          status: 'Pending',
          date: '2024-02-15',
          package: 'TBD'
        }
      ];
      setCompanies(sampleCompanies);
      dispatch({ type: 'SET_COMPANIES', payload: sampleCompanies });
    }
  }, [dispatch, companies.length]);

  const selectedCount = companies.filter((c) => c.status === 'Selected').length;

  return (
    <div className="companies-page">
      <div className="card">
        <div className="page-header">
          <h1>Companies You're Selected</h1>
          <p>View companies where you've been selected</p>
        </div>

        <div className="companies-summary">
          <div className="summary-card">
            <h2>{selectedCount}</h2>
            <p>Companies Selected</p>
          </div>
          <div className="summary-card">
            <h2>{companies.length}</h2>
            <p>Total Applications</p>
          </div>
        </div>

        {companies.length === 0 ? (
          <div className="no-data">
            <p>No company selections yet.</p>
          </div>
        ) : (
          <div className="companies-list">
            {companies.map((company) => (
              <div
                key={company.id}
                className={`company-card ${company.status === 'Selected' ? 'selected' : ''}`}
              >
                <div className="company-header">
                  <div className="company-info">
                    <h3>{company.name}</h3>
                    <p className="company-position">{company.position}</p>
                  </div>
                  <span
                    className={`status-badge ${
                      company.status === 'Selected' ? 'status-selected' : 'status-pending'
                    }`}
                  >
                    {company.status}
                  </span>
                </div>
                <div className="company-details">
                  <div className="detail-row">
                    <span className="detail-label">Selection Date:</span>
                    <span className="detail-value">{company.date}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Package:</span>
                    <span className="detail-value package">{company.package}</span>
                  </div>
                </div>
                {company.status === 'Selected' && (
                  <div className="company-actions">
                    <button className="btn btn-success">Accept Offer</button>
                    <button className="btn btn-secondary">View Details</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesPage;





