import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import custom CSS

const HomePage = () => {
    return (
        <div className="home-container">
            <div className="content">
                <h1>Welcome to Our App</h1>
                <p className="lead">Manage your projects and tasks efficiently.</p>
                <div className="button-group">
                    <Link to="/login" className="btn btn-primary">Login</Link>
                    <Link to="/register" className="btn btn-secondary">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
