import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './addpatients.scss';

const AddPatient = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPatientData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setPatientData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('User is not authenticated. Please log in again.');
      return;
    }

    const payload = {
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      email: patientData.email,
      mobile: patientData.phone,
      dob: patientData.dob,
      gender: patientData.gender,
      address: patientData.address,
    };

    try {
      const response = await fetch('https://hospital-management-epar.onrender.com/api/patients/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('Patient added successfully!');
        const existing = JSON.parse(localStorage.getItem('patients')) || [];
        localStorage.setItem('patients', JSON.stringify([...existing, patientData]));
        setPatientData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dob: '',
          gender: '',
          address: '',
          image: '',
        });
      } else {
        toast.error(result.error || 'Failed to add patient');
      }
    } catch (err) {
      console.error('Error adding patient:', err);
      toast.error('Failed to connect to server');
    }
  };

  return (
    <div className="add-patient-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <button className="back-btn" onClick={() => navigate('/homepage')}>
        <FaArrowLeft /> Back to Home
      </button>

      <div className="center-wrapper">
        <h1 className="main-heading"><FaUserPlus className='add-patient-icon'/>Add Patient</h1>

        <div className="form-card">
          <h2>Patient Information</h2>
          <form className="patient-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={patientData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={patientData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={patientData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={patientData.phone} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="dob" value={patientData.dob} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={patientData.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Address</label>
                <input type="text" name="address" value={patientData.address} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Upload Image</label>
                <input type="file" name="image" accept="image/*" onChange={handleChange} />
                {patientData.image && (
                  <img src={patientData.image} alt="Preview" className="image-preview" />
                )}
              </div>
            </div>

            <button type="submit" className="submit-btn">Add Patient</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
