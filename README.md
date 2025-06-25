# 🩺 Doctor Patient Management System

A comprehensive web-based Doctor-Patient Management System that enables doctors to efficiently manage patient records, prescriptions, and medicine data.

This project includes a complete **React.js frontend**, **Node.js + Express backend**, and **MongoDB database**, all hosted using free-tier platforms like **Vercel** and **Render**.

> 🌐 **Live Website**: [Doctor Patient Management (Frontend)](https://doctor-patient-management-beige.vercel.app)  
> 🔗 **Backend API**: [Render Hosted API](https://hospital-management-epar.onrender.com)

---

## 📌 Features

### 👨‍⚕️ Doctor Login
- Secure login using email and password (with Bearer Token authentication).

### 📝 Patient Management
- Add patient details:  
  _Name, Email, Contact, DOB, Gender, Address, Profile Image._
- View a list of all patients.

### 💊 Medicine Management
- Add medicine information:  
  _Medicine Name, Manufacturer, Strength, Form, etc._
- View all added medicine records.

### 📄 Prescription Management
- Create prescriptions including:
  - Diagnosis, Symptoms, Doctor's Notes
  - Vitals: Height, Weight, Blood Pressure, Temperature, Pulse
  - Select medicine from existing list
  - Set Dosage, Frequency, Duration, Instructions
- View prescription history.

### 📊 Analytics Dashboard
- Dashboard with real-time counts of:
  - Total Patients
  - Total Medicines
  - Total Prescriptions
  - Today’s Activities

---

## 🛠️ Technologies Used

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React.js                    |
| Backend    | Node.js, Express.js         |
| Database   | MongoDB (MongoDB Atlas)     |
| Auth       | Bearer Token Authentication |
| Frontend Hosting | Vercel                |
| Backend Hosting  | Render                |

---

## 🧠 How It Works

1. Doctor logs in via the frontend.
2. JWT Bearer Token is used to authenticate all API requests.
3. Doctor can manage:
   - Patient records
   - Medicine inventory
   - Patient prescriptions
4. Analytics dashboard fetches and displays daily and total statistics.
5. All data is securely stored in MongoDB Atlas.

---

## ▶️ Getting Started

### 🔧 Prerequisites
- Node.js (v14+)
- npm
- MongoDB Atlas account

### 🔽 Clone the Repository

```bash
git clone https://github.com/kevin-savaliya/Doctor_Patient_Management.git
cd Doctor_Patient_Management
```

---

## ▶️ Running the Project

### 🚀 Start Backend

```bash
cd Backend
npm install
# Create a .env file and add:
# MONGO_URI=your_mongo_uri
# PORT=5000
# JWT_SECRET=your_jwt_secret
npm run dev
```

### 🚀 Start Frontend

```bash
cd Frontend
npm install
# Create a .env file and add:
# REACT_APP_API_URL=https://hospital-management-epar.onrender.com
npm start
```

---

## 🛠 Environment Variables

### Backend `.env`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend `.env`
```env
REACT_APP_API_URL=https://hospital-management-epar.onrender.com
```

---

## 🔮 Future Improvements

- 🔐 Enhanced role-based authorization
- 👤 Doctor Profile & Password Reset
- 🧾 Export Prescriptions to PDF
- 📅 Appointment Scheduling
- 💰 Billing & Invoicing System

---

## 👨‍💻 Author

**Kevin Savaliya**

- GitHub: [@kevin-savaliya](https://github.com/kevin-savaliya)
- Frontend: [https://doctor-patient-management-beige.vercel.app](https://doctor-patient-management-beige.vercel.app)
- Backend API: [https://hospital-management-epar.onrender.com](https://hospital-management-epar.onrender.com)

---

> ⭐️ If you found this project helpful, don’t forget to star the repository!
