// Sidebar.js
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            {/* Profile Section */}
            <div className="profile">
                <img
                    className="profile-img"
                    src="https://via.placeholder.com/50"
                    alt="User"
                />
                <div className="profile-info">
                    <span className="profile-name">Admin</span>
                    <span className="profile-role">Administrator</span>
                </div>
            </div>

            {/* Sidebar Links */}
            <ul className="sidebar-menu">
                <li className="sidebar-item">
                    <Link to="/" className="sidebar-link">
                        <span className="sidebar-icon">🏠</span>
                        <span className="sidebar-text">Dashboard</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/courses" className="sidebar-link">
                        <span className="sidebar-icon">📚</span>
                        <span className="sidebar-text">Courses</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/student-crud" className="sidebar-link">
                        <span className="sidebar-icon">👥</span>
                        <span className="sidebar-text">Students</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/events" className="sidebar-link">
                        <span className="sidebar-icon">📅</span>
                        <span className="sidebar-text">Events</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/settings" className="sidebar-link">
                        <span className="sidebar-icon">⚙️</span>
                        <span className="sidebar-text">Settings</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
