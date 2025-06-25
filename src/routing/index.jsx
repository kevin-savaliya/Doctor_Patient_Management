import React from 'react';
import { Routes, Route, useLocation, BrowserRouter, Navigate } from 'react-router-dom';

import Homepage from '../Rendering/Homepage';
import Prescription from '../Rendering/add-prescription';
import LoginPage from '../Rendering/Loginpage';
import AddPatients from '../Rendering/add-patients';
import AddMedicine from '../Rendering/add-medicine';
import SideBar from '../Common/Components/sidebar';
import ViewPatients from '../Rendering/view-patients';
import ViewMedicines from '../Rendering/view-medicines';
import ViewPrescriptions from '../Rendering/view-prescriptions';
import SplashScreen from '../Common/Components/splash screen';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Not logged in: redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (token) {
    // If logged in, redirect away from login or splash to homepage
    return <Navigate to="/homepage" state={{ from: location }} replace />;
  }
  return children;
}

function AppRoutes() {
  const location = useLocation();

  // Hide sidebar on splash and login pages
  const hideSidebar = location.pathname === '/login' || location.pathname === '/';

  return (
    <>
      {!hideSidebar && <SideBar />}
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <SplashScreen />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/homepage"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/Patient"
          element={
            <PrivateRoute>
              <AddPatients />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewpatients"
          element={
            <PrivateRoute>
              <ViewPatients />
            </PrivateRoute>
          }
        />
        <Route
          path="/Medicine"
          element={
            <PrivateRoute>
              <AddMedicine />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewmedicines"
          element={
            <PrivateRoute>
              <ViewMedicines />
            </PrivateRoute>
          }
        />
        <Route
          path="/prescription"
          element={
            <PrivateRoute>
              <Prescription />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewprescriptions"
          element={
            <PrivateRoute>
              <ViewPrescriptions />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function Routing() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
