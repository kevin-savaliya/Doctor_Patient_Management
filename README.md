# 🩺 Doctor Patient Management System

A comprehensive web-based Doctor-Patient Management System that enables doctors to efficiently manage patient records, prescriptions, and medicine data.

This project includes a complete **React.js frontend**, **Node.js + Express backend**, and **MongoDB database**, all hosted using free-tier platforms like **Vercel** and **Render**.

> 🌐 **Live Website**: [Doctor Patient Management (Frontend)](https://doctor-patient-management-beige.vercel.app)  
> 🔗 **Backend API**: [Render Hosted API](https://hospital-management-epar.onrender.com)

---

## 📌 Features

### 👨‍⚕️ Doctor Login
- Secure login using email and password.

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

---

## 🛠️ Technologies Used

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React.js                    |
| Backend    | Node.js, Express.js         |
| Database   | MongoDB (MongoDB Atlas)     |
| Image Upload | Cloudinary (optional)     |
| Frontend Hosting | Vercel                |
| Backend Hosting  | Render                |

---

## 🧠 How It Works

1. Doctor logs in via the frontend.
2. Can manage:
   - Patient records
   - Medicine inventory
   - Patient prescriptions
3. All actions communicate with the backend API hosted on Render.
4. Data is persisted in MongoDB Atlas cloud database.

---

## 📁 Project Structure

```
Doctor_Patient_Management/
│
├── Frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── Common/Components/    # Sidebar, splash screen, etc.
│   │   ├── Pages/                # Patient, Medicine, Prescription pages
│   │   └── App.js
│   └── package.json
│
├── Backend/                  # Node.js + Express backend
│   ├── routes/               # API routes
│   ├── models/               # Mongoose models
│   ├── controllers/          # Controller logic
│   ├── config/               # DB and dotenv config
│   ├── index.js
│   └── package.json
```

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
```

### Frontend `.env`
```env
REACT_APP_API_URL=https://hospital-management-epar.onrender.com
```

---

## 🔮 Future Improvements

- 🔐 JWT Authentication & Authorization
- 👤 Doctor Profile Management
- 🧾 Export Prescriptions to PDF
- 📊 Analytics Dashboard
- 📅 Appointment Scheduling
- 💰 Billing System

---

## 👨‍💻 Author

**Kevin Savaliya**

- GitHub: [@kevin-savaliya](https://github.com/kevin-savaliya)
- Frontend: [https://doctor-patient-management-beige.vercel.app](https://doctor-patient-management-beige.vercel.app)
- Backend API: [https://hospital-management-epar.onrender.com](https://hospital-management-epar.onrender.com)

---

> ⭐️ If you found this project helpful, don’t forget to star the repository!
