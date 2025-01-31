import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [patientDetails, setPatientDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/clinical/patients')
      .then(response => {
        setPatientDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the patient details!', error);
      });
  }, []);

  return (
    <div>
      <h1>Patient Details</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {patientDetails.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>{patient.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/addPatient'>Add Patient</Link>
    </div>
  );
}

export default Home;
