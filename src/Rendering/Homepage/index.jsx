import React, { useEffect, useState } from 'react';
import './homepage.scss';
import { useNavigate } from 'react-router-dom';
import {
  FaUserFriends, FaPills, FaFilePrescription, FaHeartbeat, FaEye
} from "react-icons/fa";

import img1 from '../../Assets/Images/home-img2.webp';
import arwimg from '../../Assets/Images/arrow-img.webp';
import SideBar from '../../Common/Components/sidebar';
import regularcheckupimg from '../../Assets/Images/home-2.svg';
import doctorsimg from '../../Assets/Images/home-1.svg';
import plusicon from '../../Assets/Images/home-4.svg';

export default function Homepage() {
  const navigate = useNavigate();

  const [patientCount, setPatientCount] = useState(0);
  const [medicineCount, setMedicineCount] = useState(0);
  const [prescriptionCount, setPrescriptionCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Your JWT token stored after login

    if (!token) {
      console.warn("No token found! Please login to fetch data.");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    fetch('https://hospital-management-epar.onrender.com/api/patients', { headers })
      .then(res => {
        if (!res.ok) throw new Error(`Patients fetch failed: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("Patients API response:", data);
        const count = Array.isArray(data) ? data.length : (data.data?.length || 0);
        setPatientCount(count);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });

    fetch('https://hospital-management-epar.onrender.com/api/medicines', { headers })
      .then(res => {
        if (!res.ok) throw new Error(`Medicines fetch failed: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("Medicines API response:", data);
        const count = Array.isArray(data) ? data.length : (data.data?.length || 0);
        setMedicineCount(count);
      })
      .catch(error => {
        console.error('Error fetching medicines:', error);
      });

    fetch('https://hospital-management-epar.onrender.com/api/prescriptions', { headers })
      .then(res => {
        if (!res.ok) throw new Error(`Prescriptions fetch failed: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("Prescriptions API response:", data);
        const count = Array.isArray(data) ? data.length : (data.data?.length || 0);
        setPrescriptionCount(count);
      })
      .catch(error => {
        console.error('Error fetching prescriptions:', error);
      });

  }, []);

  const handleConsultClick = () => {
    navigate('/Patient');
  };

  return (
    <div>
      <div>
        <SideBar />
      </div>

      <div className="main">
        <div className='homepage-main-heading'>
          <h1>Welcome to <span>The Medic</span></h1>
          <p>Your comprehensive medical management dashboard</p>
        </div>

        <div className='home-main-grid'>
          <div className='home-main-grid-left'>
            <div className='home-main-grid-left-txt'>
              <h2>Consult <span>Best Doctors</span> Your Nearby Location.</h2>
              <p>Embark on your healing journey with Doccure</p>
            </div>
            <div className='home-main-grid-left-btn'>
              <button onClick={handleConsultClick}>Start a Consult</button>
              <img src={arwimg} alt='arw-img' />
            </div>
            <div className='home-main-grid-left-icons-3'>
              <img src={plusicon} alt='grid-right-img' />
            </div>
          </div>

          <div className='home-main-grid-right'>
            <div className='home-main-grid-right-img'>
              <img src={img1} alt='grid-right-img' />
            </div>
            <div className='home-main-grid-right-icons-1'>
              <img src={regularcheckupimg} alt='grid-right-img' onClick={() => { navigate("/viewprescriptions") }} />
            </div>
            <div className='home-main-grid-right-icons-2'>
              <img src={doctorsimg} alt='grid-right-img' onClick={() => { navigate("/Patient") }} />
            </div>
          </div>
        </div>

        <div className='homepage-states'>
          <div className="dashboard">
            <div className="stats-cards">
              <div className="card blue">
                <div className="card-content">
                  <span>Total Patients</span>
                  <h2>{patientCount}</h2>
                </div>
                <FaUserFriends className="icon" />
              </div>

              <div className="card green">
                <div className="card-content">
                  <span>Medicines</span>
                  <h2>{medicineCount}</h2>
                </div>
                <FaPills className="icon" />
              </div>

              <div className="card purple">
                <div className="card-content">
                  <span>Prescriptions</span>
                  <h2>{prescriptionCount}</h2>
                </div>
                <FaFilePrescription className="icon" />
              </div>

              <div className="card orange">
                <div className="card-content">
                  <span>Today's Activity</span>
                  <h2>0</h2>
                </div>
                <FaHeartbeat className="icon" />
              </div>
            </div>

            <div className="management-sections">
              <div className="manage-box blue">
                <FaUserFriends className="section-icon" />
                <h3>Patient Management</h3>
                <p>Manage patient records and information</p>
                <button className="primary-btn1" onClick={() => navigate('/Patient')}>Add New Patient</button>
                <button className="view-btn1" onClick={() => navigate('/viewpatients')}>
                  <FaEye /> View All Patients
                </button>
              </div>

              <div className="manage-box green">
                <FaPills className="section-icon" />
                <h3>Medicine Management</h3>
                <p>Manage medicine inventory and details</p>
                <button className="primary-btn2" onClick={() => navigate('/Medicine')}>Add New Medicine</button>
                <button className="view-btn2" onClick={() => navigate('/viewmedicines')}>
                  <FaEye /> View All Medicines
                </button>
              </div>

              <div className="manage-box purple">
                <FaFilePrescription className="section-icon" />
                <h3>Prescription Management</h3>
                <p>Create and manage prescriptions</p>
                <button className="primary-btn3" onClick={() => navigate('/prescription')}>Create Prescription</button>
                <button className="view-btn3" onClick={() => navigate('/viewprescriptions')}>
                  <FaEye /> View All Prescriptions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
