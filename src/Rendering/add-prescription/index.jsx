import React, { useState, useEffect } from "react";
import "./addprescription.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFilePrescription } from "react-icons/fa";

const AddPrescription = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [vitals, setVitals] = useState({
    weight: "",
    height: "",
    bloodPressure: "",
    temperature: "",
    pulse: "",
    respirationRate: ""
  });
  const [prescriptions, setPrescriptions] = useState([
    { medicine: "", doses: "", frequency: "", duration: "", instructions: "" }
  ]);
  const [doctorNote, setDoctorNote] = useState("");

  // Symptom options for checkboxes
  const symptomOptions = [
    "Low Mood / Depression",
    "Anxiety / Panic Attacks",
    "Irritability / Anger Issues",
    "Sleep Disturbances / Insomnia",
    "Hallucinations (Seeing/Feeling Things)",
    "Delusions / Paranoia",
    "Memory Problems",
    "Poor Concentration",
    "Social Withdrawal",
    "Mood Swings",
    "Suicidal Thoughts",
    "Substance Abuse / Addiction",
    "Phobias",
    "Obsessive Thoughts / Compulsions",
    "Excessive Worry / Nervousness",
  ];

  useEffect(() => {
    fetchPatients();
    fetchMedicines();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please login again.");
        return;
      }

      const res = await fetch("https://hospital-management-epar.onrender.com/api/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch patients");

      const data = await res.json();
      setPatients(data.data);
    } catch (err) {
      toast.error("Failed to fetch patients");
    }
  };

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please login again.");
        return;
      }

      const res = await fetch("https://hospital-management-epar.onrender.com/api/medicines", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch medicines");

      const data = await res.json();
      setMedicines(data.data);
    } catch (err) {
      toast.error("Failed to fetch medicines");
    }
  };

  const handlePrescriptionChange = (index, field, value) => {
    const updated = [...prescriptions];
    updated[index][field] = value;
    setPrescriptions(updated);
  };

  const addPrescriptionField = () => {
    setPrescriptions([
      ...prescriptions,
      { medicine: "", doses: "", frequency: "", duration: "", instructions: "" },
    ]);
  };

  const removePrescriptionField = (index) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  const handleVitalsChange = (field, value) => {
    setVitals({ ...vitals, [field]: value });
  };

  // Toggle symptom selection for checkboxes
  const toggleSymptom = (symptom) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((s) => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  // Reset form fields to initial states
  const resetForm = () => {
    setSelectedPatient("");
    setDiagnosis("");
    setSymptoms([]);
    setVitals({
      weight: "",
      height: "",
      bloodPressure: "",
      temperature: "",
      pulse: "",
      respirationRate: ""
    });
    setPrescriptions([
      { medicine: "", doses: "", frequency: "", duration: "", instructions: "" }
    ]);
    setDoctorNote("");
  };

  const handleSubmit = async () => {
    if (!selectedPatient) {
      toast.error("Please select a patient.");
      return;
    }

    const hasEmptyMedicine = prescriptions.some(
      (p) => !p.medicine || !p.doses || !p.frequency || !p.duration
    );
    if (hasEmptyMedicine) {
      toast.error("Please fill all medicine details.");
      return;
    }

    const listOfMedicine = prescriptions.map((presc) => {
      const selected = medicines.find((m) => m.name === presc.medicine);
      return {
        medicineId: selected?._id,
        dosage: presc.doses,
        frequency: presc.frequency,
        duration: presc.duration,
        instructions: presc.instructions
      };
    });

    const body = {
      patientEmail: selectedPatient,
      diagnosis,
      symptoms,  // send array of selected symptoms
      vitals: {
        weight: Number(vitals.weight),
        height: Number(vitals.height),
        bloodPressure: vitals.bloodPressure,
        temperature: Number(vitals.temperature),
        pulse: Number(vitals.pulse),
        respirationRate: Number(vitals.respirationRate)
      },
      listOfMedicine,
      instructions: doctorNote
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please login again.");
        return;
      }

      const res = await fetch("https://hospital-management-epar.onrender.com/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to create prescription");

      toast.success("Prescription created successfully!");
      resetForm();
      // setTimeout(() => navigate("/homepage"), 2000);
    } catch (err) {
      toast.error("Error submitting prescription");
    }
  };

  return (
    <div className="add-prescription-bg">
      <div className="top-bar">
        <button onClick={() => navigate("/homepage")} className="add-prescription-back-button">
          ← Back to Home
        </button>
      </div>

      <h2 className="page-title"><FaFilePrescription className="add-prescription-icon"/>Add Prescription</h2>

      <div className="add-prescription">
        <div className="section">
          <h3 className="section-h3">Prescription Information</h3>
          <label className="section-heading-h3-1">Select Patient</label>
          <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
            <option value="">Select patient by email</option>
            {patients.map((patient, index) => (
              <option key={index} value={patient.email}>
                {patient.email}
              </option>
            ))}
          </select>
        </div>

        <div className="section diagnosis-section">
          <h3 className="section-heading-h3-1">Diagnosis</h3>
          <input
            type="text"
            placeholder="Enter diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>

        {/* Symptoms section with checkboxes, 2 per row */}
        <div className="section symptoms-section">
          <h3 className="section-heading-h3-1">Symptoms</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px 20px",
            }}
          >
            {symptomOptions.map((symptom, index) => (
              <label key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={symptoms.includes(symptom)}
                  onChange={() => toggleSymptom(symptom)}
                />
                {symptom}
              </label>
            ))}
          </div>
        </div>

        {/* Vitals section - no changes here */}
        <div className="medicine-form vitals-card">
          <div className="medicine-form-header">
            <h4>Vitals</h4>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Weight</label>
              <input
                type="text"
                value={vitals.weight}
                onChange={(e) => handleVitalsChange("weight", e.target.value)}
                placeholder="Enter weight"
              />
            </div>
            <div className="form-group">
              <label>Height</label>
              <input
                type="text"
                value={vitals.height}
                onChange={(e) => handleVitalsChange("height", e.target.value)}
                placeholder="Enter height"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Blood Pressure</label>
              <input
                type="text"
                value={vitals.bloodPressure}
                onChange={(e) => handleVitalsChange("bloodPressure", e.target.value)}
                placeholder="Enter blood pressure"
              />
            </div>
            <div className="form-group">
              <label>Temperature</label>
              <input
                type="text"
                value={vitals.temperature}
                onChange={(e) => handleVitalsChange("temperature", e.target.value)}
                placeholder="Enter temperature"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Pulse</label>
              <input
                type="text"
                value={vitals.pulse}
                onChange={(e) => handleVitalsChange("pulse", e.target.value)}
                placeholder="Enter pulse"
              />
            </div>
            <div className="form-group">
              <label>Respiration Rate</label>
              <input
                type="text"
                value={vitals.respirationRate}
                onChange={(e) => handleVitalsChange("respirationRate", e.target.value)}
                placeholder="Enter respiration rate"
              />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="header-row">
            <h3 className="section-heading-h3-2">Medicine Prescriptions</h3>
            <button type="button" className="add-button" onClick={addPrescriptionField}>
              + Add Medicine
            </button>
          </div>

          {prescriptions.map((presc, index) => (
            <div className="medicine-form" key={index}>
              <div className="medicine-form-header">
                <h4>Medicine Prescription</h4>
                <button className="remove-button" onClick={() => removePrescriptionField(index)}>
                  ×
                </button>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Medicine</label>
                  <select
                    value={presc.medicine}
                    onChange={(e) => handlePrescriptionChange(index, "medicine", e.target.value)}
                  >
                    <option value="">Select medicine</option>
                    {medicines.map((medicine, idx) => (
                      <option key={idx} value={medicine.name}>
                        {medicine.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Doses</label>
                  <input
                    type="text"
                    value={presc.doses}
                    onChange={(e) => handlePrescriptionChange(index, "doses", e.target.value)}
                    placeholder="Enter doses"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Frequency</label>
                  <input
                    type="text"
                    value={presc.frequency}
                    onChange={(e) => handlePrescriptionChange(index, "frequency", e.target.value)}
                    placeholder="Enter frequency"
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    value={presc.duration}
                    onChange={(e) => handlePrescriptionChange(index, "duration", e.target.value)}
                    placeholder="Enter duration"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Instructions</label>
                  <textarea
                    value={presc.instructions}
                    onChange={(e) => handlePrescriptionChange(index, "instructions", e.target.value)}
                    placeholder="Additional instructions"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section">
          <h3 className="section-heading-h3-1">Doctor's Note</h3>
          <textarea
            value={doctorNote}
            onChange={(e) => setDoctorNote(e.target.value)}
            placeholder="Enter doctor's notes"
          />
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          Submit Prescription
        </button>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddPrescription;
