import 'package:flutter/material.dart';
import '../model/prescription_model.dart';
import '../services/api_service.dart';
import '../model/medicine_model.dart';

class PrescriptionDetailScreen extends StatelessWidget {
  final PrescriptionModel prescription;
  const PrescriptionDetailScreen({Key? key, required this.prescription}) : super(key: key);

  String formatDateTime(DateTime dt) {
    return '${dt.day.toString().padLeft(2, '0')}-${dt.month.toString().padLeft(2, '0')}-${dt.year} ${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}';
  }

  Widget vitalsSection(visit) {
    return Card(
      elevation: 1,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Vitals', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(height: 8),
            Text('Weight: ${visit.vitals.weight} kg'),
            Text('Height: ${visit.vitals.height} cm'),
            Text('Blood Pressure: ${visit.vitals.bloodPressure}'),
            Text('Temperature: ${visit.vitals.temperature} °C'),
            Text('Pulse: ${visit.vitals.pulse}'),
            Text('Respiration Rate: ${visit.vitals.respirationRate}'),
          ],
        ),
      ),
    );
  }

  Widget followUpSection(visit) {
    if (visit.recommendedFollowUpDate == null && (visit.followUpNotes == null || visit.followUpNotes!.isEmpty)) {
      return const SizedBox.shrink();
    }
    return Card(
      elevation: 1,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Follow Up', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            if (visit.recommendedFollowUpDate != null)
              Text('Date: ${formatDateTime(visit.recommendedFollowUpDate!)}'),
            if (visit.followUpNotes != null && visit.followUpNotes!.isNotEmpty)
              Text('Notes: ${visit.followUpNotes}'),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final visit = prescription.visit;
    return Scaffold(
      appBar: AppBar(title: const Text('Prescription Details')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.calendar_today, size: 18, color: Colors.blueGrey),
                const SizedBox(width: 8),
                Text(formatDateTime(prescription.createdAt), style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              ],
            ),
            const SizedBox(height: 12),
            Text('Diagnosis: ${visit.diagnosis}', style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            Text('Symptoms: ${visit.symptoms.join(", ")}', style: const TextStyle(color: Colors.grey)),
            const SizedBox(height: 8),
            vitalsSection(visit),
            followUpSection(visit),
            const SizedBox(height: 8),
            const Text('Medicines', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(height: 6),
            ...prescription.listOfMedicine.map((medPres) => Card(
  margin: const EdgeInsets.symmetric(vertical: 6),
  elevation: 0,
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
  child: Padding(
    padding: const EdgeInsets.all(10),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Medicine ID: ${medPres.medicineId}', style: const TextStyle(fontWeight: FontWeight.bold)),
        Text('Dosage: ${medPres.dosage}'),
        Text('Frequency: ${medPres.frequency}'),
        Text('Duration: ${medPres.duration}'),
        if (medPres.instructions.isNotEmpty)
          Text('Instructions: ${medPres.instructions}'),
      ],
    ),
  ),
)), 
            const SizedBox(height: 16),
            const Text('Prescription Instructions', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(height: 4),
            Text(prescription.instructions, style: const TextStyle(fontSize: 15)),
          ],
        ),
      ),
    );
  }
}

class MedicineDetailWidget extends StatelessWidget {
  final MedicinePrescription medPrescription;
  final List<MedicineModel> medicines;
  const MedicineDetailWidget({Key? key, required this.medPrescription, required this.medicines}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final med = ApiService.getMedicineById(medicines, medPrescription.medicineId);
    if (med == null) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Text('Medicine not found', style: TextStyle(color: Colors.red)),
      );
    }
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      margin: const EdgeInsets.symmetric(vertical: 6),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(med.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
            Text('Strength: \\${med.strength}'),
            Text('Form: \\${med.form}'),
            Text('Manufacturer: \\${med.manufacturer}'),
            const SizedBox(height: 4),
            Text('Dosage: \\${medPrescription.dosage}'),
            Text('Frequency: \\${medPrescription.frequency}'),
            Text('Duration: \\${medPrescription.duration}'),
            Text('Instructions: \\${medPrescription.instructions}'),
          ],
        ),
      ),
    );
  }
}
