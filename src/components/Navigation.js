import React from 'react';
import {Link } from 'react-router-dom';
import '../App.css'

function Navigation() {
    return (
        <nav className="App-nav">
            <Link to="/">Home</Link>
            <Link to="/add-exercise">Add Exercise</Link>
        </nav>
    );
  }
  

export default Navigation;