import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const stats = {
    totalStudents: 1250,
    activeClasses: 48,
    avgAttendance: 92,
    upcomingEvents: 5
  };

  const handleStudentCrud = () => {
    navigate('/student-crud');
  };

  const recentAnnouncements = [
    { id: 1, title: "End of Semester Examination Schedule Released", date: "2025-01-15" },
    { id: 2, title: "Campus Career Fair Next Week", date: "2025-01-20" },
    { id: 3, title: "New Online Learning Resources Available", date: "2025-01-08" }
  ];

  return (
    <div className="dashboard">
      {/* <Sidebar /> Sidebar */}

      <div className="main-content">
        {/* Header Section */}
        <header className="dashboard-header">
          <h1>Welcome Back, Admin</h1>
          <p>Here's what's happening in your student management system</p>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <p className="stat-label">Total Students</p>
              <h3 className="stat-value">{stats.totalStudents}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <p className="stat-label">Active Classes</p>
              <h3 className="stat-value">{stats.activeClasses}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <p className="stat-label">Avg. Attendance</p>
              <h3 className="stat-value">{stats.avgAttendance}%</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <p className="stat-label">Upcoming Events</p>
              <h3 className="stat-value">{stats.upcomingEvents}</h3>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Announcements Section */}
          <div className="card announcements">
            <h2>📢 Recent Announcements</h2>
            <div className="announcement-list">
              {recentAnnouncements.map(announcement => (
                <div key={announcement.id} className="announcement-item">
                  <div className="announcement-content">
                    <h3>{announcement.title}</h3>
                    <p>{announcement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="card quick-links">
            <h2>🔗 Quick Links</h2>
            <div className="quick-links-grid">
              <button className="quick-link-button" onClick={handleStudentCrud}>
                <span className="quick-link-icon">🔧</span>
                <div className="quick-link-text">
                  <h3>Student CRUD</h3>
                  <p>Manage all student records (CRUD operations)</p>
                </div>
              </button>
              {/* Other Quick Links */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
