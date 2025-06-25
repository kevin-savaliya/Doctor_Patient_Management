import React, { useEffect, useState } from 'react';
import './viewpatients.scss';
import { FaArrowLeft, FaUser, FaTimes, FaUserFriends } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedPatient, setEditedPatient] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('https://hospital-management-epar.onrender.com/api/patients/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          // Sort patients by first name in ascending order
          const sortedPatients = data.data.sort((a, b) =>
            a.firstName.localeCompare(b.firstName)
          );
          setPatients(sortedPatients);
        } else {
          console.error('Failed to fetch patients:', data.message);
        }
      } catch (error) {
        console.error('Error fetching patients:', error.message);
      }
    };

    fetchPatients();
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleDeactivate = async (patientId) => {
    const confirmDelete = window.confirm('Are you sure you want to deactivate this patient?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`https://hospital-management-epar.onrender.com/api/patients/${patientId}/deactivate`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success) {
        setPatients((prev) => prev.filter((p) => p._id !== patientId));
      } else {
        console.error('Failed to deactivate patient:', data.message);
      }
    } catch (err) {
      console.error('Error deactivating patient:', err.message);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedPatient({ ...patients[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setEditedPatient((prev) => ({ ...prev, profileImage: base64 }));
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const patientId = editedPatient._id;

    try {
      const res = await fetch(`https://hospital-management-epar.onrender.com/api/patients/${patientId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPatient),
      });

      const data = await res.json();
      if (data.success) {
        const updatedPatients = [...patients];
        updatedPatients[editIndex] = data.data;

        // Re-sort the updated list
        updatedPatients.sort((a, b) => a.firstName.localeCompare(b.firstName));

        setPatients(updatedPatients);
        setEditIndex(null);
        setEditedPatient({});
      } else {
        console.error('Failed to update patient:', data.message);
      }
    } catch (err) {
      console.error('Error updating patient:', err.message);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedPatient({});
  };

  return (
    <div className='main-view-patients'>
      <div className="view-patients">
        <div className="header">
          <button className="back-btn" onClick={() => navigate('/homepage')}>
            <FaArrowLeft /> Back to Home
          </button>
          <h1 className="page-title"><FaUserFriends className='view-patient-icon'/> Patient Details</h1>
        </div>

        {patients.map((patient, index) => (
          <div className="patient-card" key={patient._id}>
            <div className="top-buttons">
              {editIndex !== index && (
                <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
              )}
              <FaTimes className="delete-icon" onClick={() => handleDeactivate(patient._id)} />
            </div>

            <div className="image-container">
              <img
                src={
                  editIndex === index
                    ? editedPatient.profileImage || "https://via.placeholder.com/200"
                    : patient.profileImage || "https://via.placeholder.com/200"
                }
                alt="Patient"
              />
            </div>

            <div className="patient-info">
              {editIndex === index ? (
                <>
                  <div className="info-row">
                    <div className="field">
                      <label>First Name:</label>
                      <input name="firstName" value={editedPatient.firstName || ''} onChange={handleChange} />
                    </div>
                    <div className="field">
                      <label>Last Name:</label>
                      <input name="lastName" value={editedPatient.lastName || ''} onChange={handleChange} />
                    </div>
                    <div className="field">
                      <label>Email:</label>
                      <input name="email" value={editedPatient.email || ''} onChange={handleChange} />
                    </div>
                    <div className="field">
                      <label>Phone:</label>
                      <input name="mobile" value={editedPatient.mobile || ''} onChange={handleChange} />
                    </div>
                    <div className="field">
                      <label>DOB:</label>
                      <input type="date" name="dob" value={editedPatient.dob?.substring(0, 10) || ''} onChange={handleChange} />
                    </div>
                    <div className="field">
                      <label>Gender:</label>
                      <select name="gender" value={editedPatient.gender || ''} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>Address:</label>
                      <input name="address" value={editedPatient.address || ''} onChange={handleChange} />
                    </div>
                    <div className="field">
                      <label>Change Image:</label>
                      <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                  </div>
                  <div className="button-row">
                    <button className="edit-btn save-btn" onClick={handleSave}>Save</button>
                    <button className="edit-btn cancel-btn" onClick={handleCancel}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="info-row">
                    <div className="field">
                      <label>Name:</label>
                      <span>{patient.firstName} {patient.lastName}</span>
                    </div>
                    <div className="field">
                      <label>Email:</label>
                      <span>{patient.email}</span>
                    </div>
                    <div className="field">
                      <label>Phone no:</label>
                      <span>{patient.mobile}</span>
                    </div>
                    <div className="field">
                      <label>DOB:</label>
                      <span>{new Date(patient.dob).toLocaleDateString()}</span>
                    </div>
                    <div className="field">
                      <label>Gender:</label>
                      <span>{patient.gender}</span>
                    </div>
                    <div className="field">
                      <label>Address:</label>
                      <span>{patient.address}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
