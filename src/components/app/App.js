import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "../pages/Home";
import './App.css';
import Sidebar from "../sidebar/Sidebar";
import Sessions from "../pages/Sessions";
import Session from "../pages/Session";

function App() {

    return (
        <Router>
            <div className="page-content">
                <Sidebar/>
                <Routes>
                    <Route
                        path="/" element={<Home />}
                    />
                    <Route
                        path="/sessions" element={<Sessions />}
                    />
                    <Route
                        path="/sessions/:id" element={<Session />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
