import React, { useEffect, useState } from "react";
import "./viewprescriptions.scss";
import { FaFileAlt, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ViewPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedPrescription, setEditedPrescription] = useState({});
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");

        // Fetch prescriptions
        const resPrescriptions = await fetch(
          "https://hospital-management-epar.onrender.com/api/prescriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!resPrescriptions.ok) throw new Error(`Prescriptions error: ${resPrescriptions.status}`);
        const prescData = await resPrescriptions.json();

        const formattedPrescriptions = prescData.data.map((presc) => ({
          _id: presc._id,
          patientEmail: presc.patientEmail,
          diagnosis: presc.diagnosis,
          symptoms: presc.symptoms,
          vitals: presc.vitals,
          medicines: presc.listOfMedicine.map((med) => ({
            medicine: med.medicineId?.name || "",
            medicineId: med.medicineId?._id || "",
            dosage: med.dosage || "",
            frequency: med.frequency || "",
            duration: med.duration || "",
            instruction: med.instructions || "",
          })),
          doctorPrescription: presc.instructions || "",
        }));
        setPrescriptions(formattedPrescriptions);

        // Fetch all medicines
        const resMedicines = await fetch(
          "https://hospital-management-epar.onrender.com/api/medicines",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!resMedicines.ok) throw new Error(`Medicines error: ${resMedicines.status}`);
        const medicineData = await resMedicines.json();

        if (medicineData.success && Array.isArray(medicineData.data)) {
          setMedicineOptions(medicineData.data); // Array of { _id, name }
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDelete = (index) => {
    const updated = [...prescriptions];
    updated.splice(index, 1);
    setPrescriptions(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const presc = prescriptions[index];

    setEditedPrescription({
      diagnosis: presc.diagnosis || "",
      symptoms: Array.isArray(presc.symptoms) ? presc.symptoms.join(", ") : "",
      vitals: {
        weight: presc.vitals?.weight || "",
        height: presc.vitals?.height || "",
        bloodPressure: presc.vitals?.bloodPressure || "",
        temperature: presc.vitals?.temperature || "",
      },
      medicines: presc.medicines.map((med) => ({
        medicine: med.medicine,
        dosage: med.dosage,
        frequency: med.frequency,
        duration: med.duration,
        instruction: med.instruction,
      })),
      doctorPrescription: presc.doctorPrescription || "",
      patientEmail: presc.patientEmail || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPrescription((prev) => ({ ...prev, [name]: value }));
  };

  const handleVitalsChange = (field, value) => {
    setEditedPrescription((prev) => ({
      ...prev,
      vitals: { ...prev.vitals, [field]: value },
    }));
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMeds = editedPrescription.medicines.map((med, i) =>
      i === index ? { ...med, [field]: value } : med
    );
    setEditedPrescription((prev) => ({ ...prev, medicines: updatedMeds }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const prescId = prescriptions[editIndex]._id;

      const payload = {
        patientEmail: editedPrescription.patientEmail,
        diagnosis: editedPrescription.diagnosis,
        symptoms: editedPrescription.symptoms
          ? editedPrescription.symptoms.split(",").map((s) => s.trim())
          : [],
        vitals: editedPrescription.vitals,
        listOfMedicine: editedPrescription.medicines.map((med) => {
          const selected = medicineOptions.find((m) => m.name === med.medicine);
          return {
            medicineId: selected ? selected._id : med.medicine,
            dosage: med.dosage,
            frequency: med.frequency,
            duration: med.duration,
            instructions: med.instruction,
          };
        }),
        instructions: editedPrescription.doctorPrescription,
      };

      const response = await fetch(
        `https://hospital-management-epar.onrender.com/api/prescriptions/${prescId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Update failed");
      }

      const result = await response.json();

      if (result.success) {
        const updated = [...prescriptions];
        updated[editIndex] = {
          ...updated[editIndex],
          ...payload,
          medicines: editedPrescription.medicines,
          doctorPrescription: payload.instructions,
        };
        setPrescriptions(updated);
        setEditIndex(null);
        setEditedPrescription({});
      } else {
        alert("Update failed: " + (result.message || ""));
      }
    } catch (err) {
      alert("Error updating prescription: " + err.message);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedPrescription({});
  };

  return (
    <div className="main-view-prescriptions">
      <div className="view-prescriptions">
        <button onClick={() => navigate("/homepage")} className="view-prescription-back-button">
          ← Back to Home
        </button>

        <h1 className="page-title"><FaFileAlt className="view-prescription-icon" />Prescriptions List</h1>

        {loading && <p>Loading prescriptions...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && prescriptions.length === 0 && <p>No prescriptions found.</p>}

        {prescriptions.map((prescription, pIndex) => (
          <div className="prescription-card" key={prescription._id || pIndex}>
            <div className="top-buttons">
              {editIndex !== pIndex && (
                <button className="edit-btn" onClick={() => handleEdit(pIndex)}>
                  Edit
                </button>
              )}
              <FaTimes className="delete-icon" onClick={() => handleDelete(pIndex)} />
            </div>

            {editIndex === pIndex ? (
              <div className="prescription-info">
                <div className="field patient-email">
                  <label>Patient Email:</label>
                  <input name="patientEmail" value={editedPrescription.patientEmail} onChange={handleChange} />
                </div>

                <div className="field patient-diagnosis">
                  <label>Diagnosis:</label>
                  <input name="diagnosis" value={editedPrescription.diagnosis} onChange={handleChange} />
                </div>

                <div className="field patient-symptoms">
                  <label>Symptoms (comma separated):</label>
                  <input name="symptoms" value={editedPrescription.symptoms} onChange={handleChange} />
                </div>

                <div className="field patient-vitals">
                  <label>Vitals:</label>
                  <div className="vitals-inputs-2">
                    <input
                      placeholder="Weight"
                      value={editedPrescription.vitals?.weight || ""}
                      onChange={(e) => handleVitalsChange("weight", e.target.value)}
                    />
                    <input
                      placeholder="Height"
                      value={editedPrescription.vitals?.height || ""}
                      onChange={(e) => handleVitalsChange("height", e.target.value)}
                    />
                    <input
                      placeholder="Blood Pressure"
                      value={editedPrescription.vitals?.bloodPressure || ""}
                      onChange={(e) => handleVitalsChange("bloodPressure", e.target.value)}
                    />
                    <input
                      placeholder="Temperature"
                      value={editedPrescription.vitals?.temperature || ""}
                      onChange={(e) => handleVitalsChange("temperature", e.target.value)}
                    />
                  </div>
                </div>

                <div className="medicines-list">
                  {editedPrescription.medicines?.map((med, mIndex) => (
                    <div key={mIndex} className="medicine-edit">
                      <select
                        value={med.medicine}
                        onChange={(e) => handleMedicineChange(mIndex, "medicine", e.target.value)}
                      >
                        <option value="">Select Medicine</option>
                        {medicineOptions.map((option) => (
                          <option key={option._id} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Dosage"
                        value={med.dosage}
                        onChange={(e) => handleMedicineChange(mIndex, "dosage", e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Frequency"
                        value={med.frequency}
                        onChange={(e) => handleMedicineChange(mIndex, "frequency", e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Duration"
                        value={med.duration}
                        onChange={(e) => handleMedicineChange(mIndex, "duration", e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Instruction"
                        value={med.instruction}
                        onChange={(e) => handleMedicineChange(mIndex, "instruction", e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div className="field">
                  <label>Doctor's Prescription:</label>
                  <textarea
                    name="doctorPrescription"
                    value={editedPrescription.doctorPrescription}
                    onChange={handleChange}
                  />
                </div>

                <div className="button-row">
                  <button className="edit-btn save-btn" onClick={handleSave}>
                    Save
                  </button>
                  <button className="edit-btn cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="prescription-info">
                <div className="field patient-email">
                  <label>Patient Email:</label>
                  <span>{prescription.patientEmail}</span>
                </div>

                <div className="field-patient-diagnosis-display">
                  <label>Diagnosis :</label>
                  <span>{prescription.diagnosis || "N/A"}</span>
                </div>

                <div className="field-patient-symptoms-display">
                  <label>Symptoms :</label>
                  <span>{Array.isArray(prescription.symptoms) ? prescription.symptoms.join(", ") : "N/A"}</span>
                </div>

                <div className="field-patient-vitals-display">
                  <label>Vitals :</label>
                  {prescription.vitals && (
                    <div className="medicine-display">
                      <span>
                        <strong>Weight:</strong> {prescription.vitals.weight ?? "N/A"}
                      </span>{" "}
                      |{" "}
                      <span>
                        <strong>Height:</strong> {prescription.vitals.height ?? "N/A"}
                      </span>{" "}
                      |{" "}
                      <span>
                        <strong>BloodPressure:</strong> {prescription.vitals.bloodPressure ?? "N/A"}
                      </span>{" "}
                      |{" "}
                      <span>
                        <strong>Temperature:</strong> {prescription.vitals.temperature ?? "N/A"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="medicine">
                  <label>Medicines :</label>
                  {prescription.medicines && prescription.medicines.length > 0 ? (
                    prescription.medicines.map((medicine, mIndex) => (
                      <div className="medicine-display" key={mIndex}>
                        <span>
                          <strong>Medicine:</strong> {medicine.medicine}
                        </span>
                        {" "}
                        |{" "}
                        <span>
                          <strong>Dosage:</strong> {medicine.dosage}
                        </span>
                        {" "}
                        |{" "}
                        <span>
                          <strong>Frequency:</strong> {medicine.frequency}
                        </span>
                        {" "}
                        |{" "}
                        <span>
                          <strong>Duration:</strong> {medicine.duration}
                        </span>
                        {" "}
                        |{" "}
                        <span>
                          <strong>Instruction:</strong> {medicine.instruction}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>No medicines listed</p>
                  )}
                </div>

                <div className="field">
                  <label>Doctor's Prescription :</label>
                  <span>{prescription.doctorPrescription || "N/A"}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
