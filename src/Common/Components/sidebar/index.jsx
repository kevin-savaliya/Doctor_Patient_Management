import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.scss';

import greenlogo from '../../../Assets/Logo/medic_teal_text.svg';

import {
  FaHome,
  FaUserPlus,
  FaUserFriends,
  FaPills,
  FaClipboardList,
  FaFilePrescription,
  FaFileAlt
} from 'react-icons/fa';

import { IoLogOut } from "react-icons/io5";

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const sections = [
    {
      title: 'Homepage',
      items: [
        { label: 'Dashboard', path: '/homepage', icon: <FaHome /> },
      ],
    },
    {
      title: 'Patient Management',
      items: [
        { label: 'Add Patient', path: '/Patient', icon: <FaUserPlus /> },
        { label: 'View Patients', path: '/viewpatients', icon: <FaUserFriends /> },
      ],
    },
    {
      title: 'Medicine Management',
      items: [
        { label: 'Add Medicine', path: '/Medicine', icon: <FaPills /> },
        { label: 'View Medicines', path: '/viewmedicines', icon: <FaClipboardList /> },
      ],
    },
    {
      title: 'Prescription Management',
      items: [
        { label: 'Add Prescription', path: '/prescription', icon: <FaFilePrescription /> },
        { label: 'View Prescriptions', path: '/viewprescriptions', icon: <FaFileAlt /> },
      ],
    },
    {
      title: 'Logout',
      items: [
        { label: 'Logout', path: '/', icon: <IoLogOut />, isLogout: true },
      ],
    },
  ];

  const handleClick = (item) => {
    if (item.isLogout) {
      setShowLogoutConfirm(true);
    } else {
      navigate(item.path);
    }
  };

  const handleLogoutConfirm = (confirm) => {
    if (confirm) {
      // Clear token from localStorage on logout
      localStorage.removeItem('token');
      // Redirect to splash screen (/) and replace history to avoid back navigation to protected pages
      navigate('/', { replace: true });
    }
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <img src={greenlogo} alt='medic-logo' onClick={() => navigate("/homepage")} />
          </div>
        </div>

        <div className="sidebar-menu">
          {sections.map(section => (
            <div key={section.title} className="menu-section">
              <p className="section-title">{section.title}</p>
              <ul>
                {section.items.map(item => (
                  <li
                    key={item.label}
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={() => handleClick(item)}
                  >
                    <span className="icon">{item.icon}</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="logout-popup-overlay">
          <div className="logout-popup">
            <div className='logout-logo'>
              <img src={greenlogo} alt='medic-logo' />
            </div>
            <p>Are you sure you want to logout ?</p>
            <div className="popup-buttons">
              <button className="yes-btn" onClick={() => handleLogoutConfirm(true)}>Yes</button>
              <button className="no-btn" onClick={() => handleLogoutConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
