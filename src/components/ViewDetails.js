
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function ViewDetails() {
  const [patient, setPatient] = useState({});
  const {patientId} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/clinical/patients/${patientId}`)
      .then(response => {
        setPatient(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the patient data!', error);
      });
  }, [patientId]);

  return (
    <div>
      <h1>Patient Details</h1>
      <p><strong>First Name:</strong> {patient.firstName}</p>
      <p><strong>Last Name:</strong> {patient.lastName}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <h3>Clinical Data</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Component Name</th>
            <th>Component Value</th>
            <th>Measured Date Time</th>
          </tr>
        </thead>
        <tbody>
          {patient.clinicalData && patient.clinicalData.map(data => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.componentName}</td>
              <td>{data.componentValue}</td>
              <td>{new Date(data.measuredDateTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/addClinicals/${patient.id}`} >Add Data</Link>
    </div>
  );
}

export default ViewDetails;
