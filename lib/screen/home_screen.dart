import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:patient_dev/screen/patient_profile_screen.dart';
import 'package:get_storage/get_storage.dart';
import '../controller/patient_profile_controller.dart';
import '../theme/colors.dart';
import 'prescription_list_home_widget.dart';
import '../widget/overview_food_widget.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: AppColors.primaryColor,
        title:
            const Text('Patient Home', style: TextStyle(color: Colors.white)),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.account_circle, color: Colors.white),
            onPressed: () {
              if (!Get.isRegistered<PatientProfileController>()) {
                Get.put(PatientProfileController());
              }
              Get.to(() => PatientProfileScreen());
            },
          ),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              'Welcome to the Patient Home Screen!',
              style: TextStyle(
                  fontSize: 20,
                  color: AppColors.primaryColor,
                  fontWeight: FontWeight.bold),
            ),
          ),
          Expanded(
            child: PrescriptionListHomeWidget(
              userEmail: GetStorage().read('email') ?? '',
            ),
          ),
        ],
      ),
    );
  }
}
