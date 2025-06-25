import React, { useEffect, useState } from 'react';
import './viewmedicines.scss';
import { FaClipboardList, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ViewMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedMedicine, setEditedMedicine] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('https://hospital-management-epar.onrender.com/api/medicines', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        const sortedMedicines = data.data.sort((a, b) => a.name.localeCompare(b.name));
        setMedicines(sortedMedicines);
      } else {
        console.error('Failed to fetch medicines:', data.message);
      }
    } catch (err) {
      console.error('Error fetching medicines:', err.message);
    }
  };

  const handleDelete = async (index) => {
    const medicine = medicines[index];
    const confirmDelete = window.confirm('Are you sure you want to deactivate this medicine?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(
        `https://hospital-management-epar.onrender.com/api/medicines/${medicine._id}/deactivate`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        const updatedMedicines = [...medicines];
        updatedMedicines.splice(index, 1);
        setMedicines(updatedMedicines);
      } else {
        console.error('Failed to deactivate medicine:', data.message);
      }
    } catch (err) {
      console.error('Error deactivating medicine:', err.message);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedMedicine({ ...medicines[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMedicine((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(
        `https://hospital-management-epar.onrender.com/api/medicines/${editedMedicine._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedMedicine),
        }
      );
      const data = await res.json();
      if (data.success) {
        const updatedMedicines = [...medicines];
        updatedMedicines[editIndex] = data.data || editedMedicine;

        // Sort updated list by name
        updatedMedicines.sort((a, b) => a.name.localeCompare(b.name));

        setMedicines(updatedMedicines);
        setEditIndex(null);
      } else {
        alert('Failed to update medicine: ' + data.message);
      }
    } catch (err) {
      alert('Error updating medicine: ' + err.message);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedMedicine({});
  };

  return (
    <div className="main-view-medicines">
      <div className="view-medicines">
        <button className="view-medicine-back-button" onClick={() => navigate('/homepage')}>
          ← Back to Home
        </button>

        <h1 className="page-title"><FaClipboardList className='view-medicine-icon'/>Medicines List</h1>

        {medicines.length === 0 && <p>No medicines found.</p>}

        <div className="medicine-card-grid">
          {medicines.map((medicine, index) => (
            <div className="medicine-card" key={index}>
              <div className="top-buttons">
                {editIndex !== index && (
                  <button className="edit-btn" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                )}
                <FaTimes className="delete-icon" onClick={() => handleDelete(index)} />
              </div>

              <div className="medicine-info">
                {editIndex === index ? (
                  <>
                    <div className="info-row">
                      <div className="field">
                        <label>Name:</label>
                        <input
                          name="name"
                          value={editedMedicine.name || ''}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="field">
                        <label>Manufacturer:</label>
                        <input
                          name="manufacturer"
                          value={editedMedicine.manufacturer || ''}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="field">
                        <label>Strength:</label>
                        <input
                          name="strength"
                          value={editedMedicine.strength || ''}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="field">
                        <label>Form:</label>
                        <input
                          name="form"
                          value={editedMedicine.form || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="button-row">
                      <button className="edit-btn save-btn" onClick={handleSave}>
                        Save
                      </button>
                      <button className="edit-btn cancel-btn" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="info-row">
                      <div className="field">
                        <label>Name:</label>
                        <span>{medicine.name}</span>
                      </div>
                      <div className="field">
                        <label>Manufacturer:</label>
                        <span>{medicine.manufacturer}</span>
                      </div>
                      <div className="field">
                        <label>Strength:</label>
                        <span>{medicine.strength}</span>
                      </div>
                      <div className="field">
                        <label>Form:</label>
                        <span>{medicine.form}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
