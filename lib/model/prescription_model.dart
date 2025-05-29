import 'dart:convert';

class PrescriptionModel {
  final String id;
  final VisitModel visit;
  final List<MedicinePrescription> listOfMedicine;
  final String instructions;
  final DateTime createdAt;

  PrescriptionModel({
    required this.id,
    required this.visit,
    required this.listOfMedicine,
    required this.instructions,
    required this.createdAt,
  });

  factory PrescriptionModel.fromJson(Map<String, dynamic> json) {
    return PrescriptionModel(
      id: json['_id'],
      visit: VisitModel.fromJson(json['visitId']),
      listOfMedicine: (json['listOfMedicine'] as List)
          .map((e) => MedicinePrescription.fromJson(e))
          .toList(),
      instructions: json['instructions'] ?? '',
      createdAt: DateTime.parse(json['createdAt']),
    );
  }
}

class VisitModel {
  final String id;
  final String diagnosis;
  final List<String> symptoms;
  final VitalsModel vitals;
  final String? notes;
  final DateTime date;
  final DateTime? recommendedFollowUpDate;
  final String? followUpNotes;

  VisitModel({
    required this.id,
    required this.diagnosis,
    required this.symptoms,
    required this.vitals,
    this.notes,
    required this.date,
    this.recommendedFollowUpDate,
    this.followUpNotes,
  });

  factory VisitModel.fromJson(Map<String, dynamic> json) {
    return VisitModel(
      id: json['_id'],
      diagnosis: json['diagnosis'] ?? '',
      symptoms: List<String>.from(json['symptoms'] ?? []),
      vitals: VitalsModel.fromJson(json['vitals'] ?? {}),
      notes: json['notes'],
      date: DateTime.parse(json['date']),
      recommendedFollowUpDate: json['recommendedFollowUpDate'] != null
          ? DateTime.tryParse(json['recommendedFollowUpDate'])
          : null,
      followUpNotes: json['followUpNotes'],
    );
  }
}

class VitalsModel {
  final double weight;
  final double height;
  final String bloodPressure;
  final double temperature;
  final int pulse;
  final int respirationRate;

  VitalsModel({
    required this.weight,
    required this.height,
    required this.bloodPressure,
    required this.temperature,
    required this.pulse,
    required this.respirationRate,
  });

  factory VitalsModel.fromJson(Map<String, dynamic> json) {
    return VitalsModel(
      weight: (json['weight'] ?? 0).toDouble(),
      height: (json['height'] ?? 0).toDouble(),
      bloodPressure: json['bloodPressure'] ?? '',
      temperature: (json['temperature'] ?? 0).toDouble(),
      pulse: json['pulse'] ?? 0,
      respirationRate: json['respirationRate'] ?? 0,
    );
  }
}

class MedicinePrescription {
  final String medicineId;
  final String dosage;
  final String frequency;
  final String duration;
  final String instructions;

  MedicinePrescription({
    required this.medicineId,
    required this.dosage,
    required this.frequency,
    required this.duration,
    required this.instructions,
  });

  factory MedicinePrescription.fromJson(Map<String, dynamic> json) {
    return MedicinePrescription(
      medicineId: json['medicineId'],
      dosage: json['dosage'] ?? '',
      frequency: json['frequency'] ?? '',
      duration: json['duration'] ?? '',
      instructions: json['instructions'] ?? '',
    );
  }
}
