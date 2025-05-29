import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controller/patient_profile_controller.dart';
import '../theme/colors.dart';
import 'package:get_storage/get_storage.dart';

class PatientProfileScreen extends StatefulWidget {
  const PatientProfileScreen({super.key});

  @override
  State<PatientProfileScreen> createState() => _PatientProfileScreenState();
}

class _PatientProfileScreenState extends State<PatientProfileScreen> {
  final controller = Get.find<PatientProfileController>();
// Use Obx or GetBuilder to display loading, error, and data

  @override
  void initState() {
    super.initState();
    controller.fetchPatientData();
  }

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      if (controller.isLoading.value) {
        return const Scaffold(
          backgroundColor: Colors.white,
          body: Center(child: CircularProgressIndicator()),
        );
      }
      if (controller.error.value.isNotEmpty) {
        return Scaffold(
          backgroundColor: Colors.white,
          appBar: AppBar(
            backgroundColor: AppColors.primaryColor,
            title: const Text('Profile'),
            actions: [
              IconButton(
                icon: const Icon(Icons.logout),
                onPressed: _logout,
                tooltip: 'Logout',
              ),
            ],
          ),
          body: Center(child: Text(controller.error.value, style: const TextStyle(color: Colors.red))),
        );
      }
      final patient = controller.patient.value;
      if (patient == null) {
        return Scaffold(
          backgroundColor: Colors.white,
          appBar: AppBar(
            backgroundColor: AppColors.primaryColor,
            title: const Text('Profile'),
            actions: [
              IconButton(
                icon: const Icon(Icons.logout),
                onPressed: _logout,
                tooltip: 'Logout',
              ),
            ],
          ),
          body: const Center(child: Text('No patient data found')),
        );
      }
      return Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          backgroundColor: AppColors.primaryColor,
          title: const Text('Patient Profile'),
          centerTitle: true,
          actions: [
            IconButton(
              icon: const Icon(Icons.logout),
              onPressed: _logout,
              tooltip: 'Logout',
            ),
          ],
        ),
        body: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: CircleAvatar(
                  radius: 44,
                  backgroundColor: AppColors.primaryColor.withOpacity(0.1),
                  backgroundImage: patient.profileImage != null && patient.profileImage!.isNotEmpty
                      ? NetworkImage(patient.profileImage!)
                      : null,
                  child: patient.profileImage == null || patient.profileImage!.isEmpty
                      ? Icon(Icons.person, size: 60, color: AppColors.primaryColor)
                      : null,
                ),
              ),
              const SizedBox(height: 20),
              _profileRow('Name', (patient.firstName ?? '') + (patient.lastName != null ? ' ' + patient.lastName! : '')),
              _profileRow('Email', patient.email),
              _profileRow('Mobile', patient.mobile),
              _profileRow('DOB', patient.dob != null ? patient.dob!.split('T').first : null),
              _profileRow('Gender', patient.gender),
              _profileRow('Address', patient.address),
              _profileRow('Join Date', patient.joinDate != null ? patient.joinDate!.split('T').first : null),
              _profileRow('Role', patient.role),
            ],
          ),
        ),
      );
    });
  }

  void _logout() async {
    final box = GetStorage();
    await box.remove('token');
    await box.remove('email');
    Get.offAllNamed('/login');
  }

  Widget _profileRow(String label, String? value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          SizedBox(width: 90, child: Text('$label:', style: const TextStyle(fontWeight: FontWeight.bold))),
          Expanded(child: Text(value ?? '-', style: const TextStyle(fontSize: 16))),
        ],
      ),
    );
  }
}
