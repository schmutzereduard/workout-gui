import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {

    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            {/* Burger Icon */}
            <div className="burger-icon" onClick={toggleMenu}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            {/* Sidebar */}
            <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
                <h2>Workout Api</h2>
                <div className="nav-buttons">
                    <Link to="/sessions" className="nav-button" onClick={toggleMenu}>Sessions</Link>
                    <Link to="/workouts" className="nav-button" onClick={toggleMenu}>Workouts</Link>
                    <Link to="/exercises" className="nav-button" onClick={toggleMenu}>Exercises</Link>
                </div>
            </div>

            {/* Overlay */}
            {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </>
    );
};

export default Sidebar;
