import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import '../utils/api_manager.dart';

class PatientLoginController extends GetxController {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final isLoading = false.obs;
  RxBool isPasswordVisible = false.obs;
  final box = GetStorage();

  String baseUrl = "https://hospital-management-epar.onrender.com/api/";

  void togglePasswordVisibility() => isPasswordVisible.value = !isPasswordVisible.value;

  Future<void> loginPatient() async {
    final email = emailController.text.trim();
    final password = passwordController.text.trim();
    if (email.isEmpty || password.isEmpty) {
      Get.snackbar('Error', 'Please enter both email and password', backgroundColor: Colors.redAccent, colorText: Colors.white);
      return;
    }
    isLoading.value = true;
    try {
      final response = await ApiManager.instance.makeApiCall(
        callName: 'patientLogin',
        apiUrl: '${baseUrl}auth/patient',
        callType: ApiCallType.POST,
        headers: {'Content-Type': 'application/json'},
        body: '{"email": "$email", "password": "$password"}',
        bodyType: BodyType.JSON,
        returnBody: true,
      );
      final data = response.jsonBody;
      print('Login API response data: ' + data.toString());
      print('data[\'data\']: ' + (data != null && data['data'] != null ? data['data'].toString() : 'null'));
      if (data is Map && data['success'] == true && data['data'] is Map && data['data']['token'] != null) {
        final token = data['data']['token'];
        await box.write('token', token);
        await box.write('email', email);
        Get.offAllNamed('/home');
      } else {
        Get.snackbar('Login Failed', data?['message'] ?? 'Unknown error', backgroundColor: Colors.redAccent, colorText: Colors.white);
      }
    } catch (e) {
      print('Login API error: ' + e.toString());
      Get.snackbar('Login Failed', e.toString(), backgroundColor: Colors.redAccent, colorText: Colors.white);
    } finally {
      isLoading.value = false;
    }
  }

  @override
  void onClose() {
    emailController.dispose();
    passwordController.dispose();
    super.onClose();
  }
}
