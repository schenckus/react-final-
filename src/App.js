import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';
import Navigation from './components/Navigation';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header className='App-header'>
        <h1 className='App-h1'>Full Stack Mern App</h1>
        <p className='App-p'>
          This application tracks exercises that are completed by the user. Create, edit, and delete capabilities. 
          Utilizes React for front-end, and REST API using Node and Express for back-end web service. MongoDB is used for persistence. 
        </p>
      </header>

      <Router>
        <div className="App-header">
        <Navigation />
		    <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
          <Route path="/add-exercise" element={<AddExercisePage />}></Route>
          <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
		    </Routes>
        </div> 
      </Router>
      
      <footer>
        <p>© 2023 Hope Schenck</p>
      </footer>
    </div>
  );
}

export default App;