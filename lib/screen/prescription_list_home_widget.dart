import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../model/prescription_model.dart';
import 'prescription_detail_screen.dart';

class PrescriptionListHomeWidget extends StatefulWidget {
  final String userEmail;

  const PrescriptionListHomeWidget({Key? key, required this.userEmail})
      : super(key: key);

  @override
  State<PrescriptionListHomeWidget> createState() =>
      _PrescriptionListHomeWidgetState();
}

class _PrescriptionListHomeWidgetState
    extends State<PrescriptionListHomeWidget> {
  late Future<List<PrescriptionModel>> _futurePrescriptions;

  @override
  void initState() {
    super.initState();
    _futurePrescriptions = ApiService.fetchPrescriptions(widget.userEmail);
    // _futureMedicines = ApiService.fetchAllMedicines();
  }

  String formatDateTime(DateTime dt) {
    return '${dt.day.toString().padLeft(2, '0')}-${dt.month.toString().padLeft(2, '0')}-${dt.year} ${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<PrescriptionModel>>(
      future: _futurePrescriptions,
      builder: (context, prescriptionSnapshot) {
        if (prescriptionSnapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (prescriptionSnapshot.hasError) {
          return Center(child: Text('Error: ${prescriptionSnapshot.error}'));
        } else if (!prescriptionSnapshot.hasData ||
            prescriptionSnapshot.data!.isEmpty) {
          return const Center(child: Text('No prescriptions found.'));
        }
        final prescriptions = prescriptionSnapshot.data!;
        return ListView.builder(
          itemCount: prescriptions.length,
          itemBuilder: (context, index) {
            final p = prescriptions[index];
            return GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => PrescriptionDetailScreen(
                        prescription: p,
                      ),
                    ),
                  );
                },
                child: Card(
                  elevation: 3,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12)),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            const Icon(Icons.calendar_today,
                                size: 18, color: Colors.blueGrey),
                            const SizedBox(width: 8),
                            Text(
                              formatDateTime(p.createdAt),
                              style: const TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 16),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text('Diagnosis: ${p.visit.diagnosis}',
                            style: const TextStyle(fontSize: 15)),
                        const SizedBox(height: 6),
                        Text('Symptoms: ${p.visit.symptoms.join(", ")}',
                            style: const TextStyle(color: Colors.grey)),
                        const SizedBox(height: 6),
                        Text(
                          'Instructions: ${p.instructions}',
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(color: Colors.black87),
                        ),
                        // const SizedBox(height: 6),
                        // ...p.listOfMedicine.map((medPres) => Padding(
                        //       padding: const EdgeInsets.symmetric(vertical: 2),
                        //       child: Text(
                        //           'Medicine ID: \\${medPres.medicineId}',
                        //           style:
                        //               TextStyle(fontWeight: FontWeight.bold)),
                        //     )),
                      ],
                    ),
                  ),
                ));
          },
        );
      },
    );
  }
}
