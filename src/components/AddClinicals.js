
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router-dom';
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function AddClinicals() {
  const [patient, setPatient] = useState({});
  const {patientId} = useParams();

  const [componentName, setComponentName] = useState('');
  const [componentValue, setComponentValue] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/clinical/patients/${patientId}`)
      .then(response => {
        setPatient(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the patient data!', error);
      });
  }, [patientId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const clinicalData = { componentName, componentValue, patientId };

    axios.post('http://localhost:8080/api/clinical/clinicaldata', clinicalData)
      .then(response => {
        console.log('Clinical data added successfully:', response.data);
        toast.success('Clinical data added successfully!');
        // Optionally, you can update the patient state to reflect the new data
        setPatient(prevState => ({
          ...prevState,
          clinicalData: [...prevState.clinicalData, response.data]
        }));
        // Redirect to another page
        navigate('/viewDetails/' + patientId);
      })
      .catch(error => {
        console.error('There was an error adding the clinical data!', error);
      });
  };

  return (
    <div>
      <h1>Patient Details</h1>
      <p><strong>First Name:</strong> {patient.firstName}</p>
      <p><strong>Last Name:</strong> {patient.lastName}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <h3>New Data</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Component Name:</label>
          <input
            type="text"
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
          />
        </div>
        <div>
          <label>Component Value:</label>
          <input
            type="text"
            value={componentValue}
            onChange={(e) => setComponentValue(e.target.value)}
          />
        </div>
        <button type="submit">Add Data</button>
      </form>
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default AddClinicals;
