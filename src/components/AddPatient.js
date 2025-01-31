
import React, { useState } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function AddPatient() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const patient = { firstName, lastName, age };

    axios.post('http://localhost:8080/api/clinical/patients', patient)
      .then(response => {
        console.log('Patient added successfully:', response.data);
        toast.success('Patient added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the patient!', error);
        toast.error('There was an error adding the patient!');
      });
    };
  return (
      <div>
      <h1>Add Patient</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit">Add Patient</button>
      </form>
      <Link to="/">Go Back</Link>
      </div>
  );
}

export default AddPatient;
