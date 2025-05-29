// import 'package:flutter/material.dart';
// import '../services/api_service.dart';
// import '../model/prescription_model.dart';
//
//
//
// class PrescriptionListScreen extends StatefulWidget {
//   final String userEmail;
//   const PrescriptionListScreen({Key? key, required this.userEmail}) : super(key: key);
//
//   @override
//   State<PrescriptionListScreen> createState() => _PrescriptionListScreenState();
// }
//
// class _PrescriptionListScreenState extends State<PrescriptionListScreen> {
//   late Future<List<PrescriptionModel>> _futurePrescriptions;
//
//   @override
//   void initState() {
//     super.initState();
//     _futurePrescriptions = ApiService.fetchPrescriptions(widget.userEmail);
//   }
//
//   String formatDateTime(DateTime dt) {
//     return '${dt.day.toString().padLeft(2, '0')}-${dt.month.toString().padLeft(2, '0')}-${dt.year} ${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}';
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(title: const Text('Prescriptions')),
//       body: FutureBuilder<List<PrescriptionModel>>(
//         future: _futurePrescriptions,
//         builder: (context, prescriptionSnapshot) {
//           if (prescriptionSnapshot.connectionState == ConnectionState.waiting) {
//             return const Center(child: CircularProgressIndicator());
//           } else if (prescriptionSnapshot.hasError) {
//             return Center(child: Text('Error: ${prescriptionSnapshot.error}'));
//           } else if (!prescriptionSnapshot.hasData || prescriptionSnapshot.data!.isEmpty) {
//             return const Center(child: Text('No prescriptions found.'));
//           }
//           return ListView.builder(
//             itemCount: prescriptionSnapshot.data!.length,
//             itemBuilder: (context, index) {
//               final p = prescriptionSnapshot.data![index];
//               return Card(
//                 margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
//                 child: Padding(
//                   padding: const EdgeInsets.all(16),
//                   child: Column(
//                     crossAxisAlignment: CrossAxisAlignment.start,
//                     children: [
//                       Row(
//                         children: [
//                           const Icon(Icons.calendar_today, size: 18, color: Colors.blueGrey),
//                           const SizedBox(width: 8),
//                           Text(
//                             formatDateTime(p.createdAt),
//                             style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
//                           ),
//                         ],
//                       ),
//                       const SizedBox(height: 8),
//                       Text('Diagnosis: ${p.visit.diagnosis}', style: const TextStyle(fontSize: 15)),
//                       const SizedBox(height: 6),
//                       Text('Symptoms: ${p.visit.symptoms.join(", ")}', style: const TextStyle(color: Colors.grey)),
//                       const SizedBox(height: 6),
//                       Text(
//                         'Instructions: ${p.instructions}',
//                         maxLines: 2,
//                         overflow: TextOverflow.ellipsis,
//                         style: const TextStyle(color: Colors.black87),
//                       ),
//                       // const SizedBox(height: 6),
//                       // ...p.listOfMedicine.map((medPres) => Padding(
//                       //       padding: const EdgeInsets.symmetric(vertical: 2),
//                       //       child: Text('Medicine ID: ${medPres.medicineId}', style: const TextStyle(fontWeight: FontWeight.bold)),
//                       //     )),
//                     ],
//                   ),
//                 ),
//               );
//             },
//           );
//         },
//       ),
//     );
//   }
// }
