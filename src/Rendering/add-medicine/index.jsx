import React, { useState, useEffect } from 'react';
import './addmedicine.scss';
import { FaPills } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMedicine = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    strength: '',
    form: ''
  });

  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('medicines')) || [];
    setMedicines(saved);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('User is not authenticated. Please log in again.');
      return;
    }

    try {
      const response = await fetch('https://hospital-management-epar.onrender.com/api/medicines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(result.message || 'Medicine added successfully!');
        
        const updatedList = [...medicines, result.data];
        setMedicines(updatedList);
        localStorage.setItem('medicines', JSON.stringify(updatedList));

        setFormData({
          name: '',
          manufacturer: '',
          strength: '',
          form: ''
        });
      } else {
        toast.error(result.error || 'Failed to add medicine');
      }

    } catch (error) {
      console.error('Error adding medicine:', error);
      toast.error('Failed to connect to server');
    }
  };

  return (
    <div className="add-medicine-container">
      <button className="add-medicine-back-button" onClick={() => navigate('/homepage')}>
        ← Back to Home
      </button>

      <div className="heading-row">
        <FaPills className="icon" />
        <h2 className="page-heading">Add Medicine</h2>
      </div>

      <div className="form-card">
        <h3 className="card-title">Medicine Information</h3>
        <p className="subtitle">Enter the medicine details below</p>
        <form onSubmit={handleSubmit}>
          <div className="form-grid-two">
            <input
              name="name"
              placeholder="Enter medicine name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="manufacturer"
              placeholder="Enter manufacturer name"
              value={formData.manufacturer}
              onChange={handleChange}
              required
            />
            <input
              name="strength"
              placeholder="Enter strength (e.g. 500mg)"
              value={formData.strength}
              onChange={handleChange}
              required
            />
            <input
              name="form"
              placeholder="Enter medicine form (e.g. Tablet)"
              value={formData.form}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn-green">Add Medicine</button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AddMedicine;
