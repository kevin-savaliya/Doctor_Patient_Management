import 'package:get/get.dart';
import 'package:get/get_state_manager/src/simple/get_controllers.dart';
import 'package:get_storage/get_storage.dart';

import '../model/patient_model.dart';
import '../utils/api_manager.dart';

class PatientProfileController extends GetxController {
  Rx<Patient?> patient = Rx<Patient?>(null);
  RxBool isLoading = false.obs;
  RxString error = ''.obs;

  @override
  void onInit() {
    super.onInit();
    fetchPatientData();
  }

  Future<void> fetchPatientData() async {
    isLoading.value = true;
    error.value = '';
    try {
      final box = GetStorage();
      final email = box.read('email');
      final token = box.read('token');
      if (email == null || token == null) {
        error.value = 'Missing credentials';
        isLoading.value = false; // <-- Important
        return;
      }
      final response = await ApiManager.instance.makeApiCall(
        callName: 'getPatientProfile',
        apiUrl: 'https://hospital-management-epar.onrender.com/api/patients?email=$email',
        callType: ApiCallType.GET,
        headers: {'Authorization': 'Bearer $token'},
        returnBody: true,
      );
      final data = response.jsonBody;
      if (data != null && data['success'] == true && data['data'] != null) {
        patient.value = Patient.fromJson(data['data']);
      } else {
        error.value = data?['message'] ?? 'Failed to fetch profile';
      }
    } catch (e) {
      error.value = e.toString();
    } finally {
      isLoading.value = false;
    }
  }
}