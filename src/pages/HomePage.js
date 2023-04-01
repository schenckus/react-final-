import React from 'react';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({setExerciseToEdit}) {
    
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204) {
            const newExercise = exercises.filter(m => m._id !== _id);
            setExercises(newExercise);
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);


    return (
        <>
            <h1>List of Exercises</h1>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>

        </>
    );
}

export default HomePage;