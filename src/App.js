
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPatient from './components/AddPatient';
import AddClinicals from './components/AddClinicals';
import ViewDetails from './components/ViewDetails';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addPatient' element={<AddPatient />} />
          <Route path='/addClinicals/:patientId' element={<AddClinicals />} />
          <Route path='/viewDetails/:patientId' element={<ViewDetails />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
