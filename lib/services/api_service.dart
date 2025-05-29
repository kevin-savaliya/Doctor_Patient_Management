
import 'package:get_storage/get_storage.dart';
import '../model/prescription_model.dart';
import '../model/medicine_model.dart';
import '../utils/api_manager.dart';

class ApiService {
  static const String baseUrl = 'https://hospital-management-epar.onrender.com/api';

  static Future<List<PrescriptionModel>> fetchPrescriptions(String email) async {
  try {
    final token = GetStorage().read('token');
    final headers = token != null ? <String, String>{'Authorization': 'Bearer ${token.toString()}'} : <String, String>{};
    final response = await ApiManager.instance.makeApiCall(
      callName: 'fetchPrescriptions',
      apiUrl: '$baseUrl/prescriptions?email=$email',
      callType: ApiCallType.GET,
      headers: headers,
    );
    if (response.statusCode == 200) {
      final data = response.jsonBody;
      if (data['success'] == true && data['data'] != null) {
        return (data['data'] as List)
            .map((e) => PrescriptionModel.fromJson(e))
            .toList();
      }
    } else {
      print('[ERROR] fetchPrescriptions: statusCode=[31m${response.statusCode}[0m, body=${response.bodyText}');
      throw Exception('Failed to load prescriptions: status=${response.statusCode}, body=${response.bodyText}');
    }
    throw Exception('Failed to load prescriptions: Unexpected response');
  } catch (e, stack) {
    print('[EXCEPTION] fetchPrescriptions: $e\n$stack');
    rethrow;
  }
}

  // static Future<List<MedicineModel>> fetchAllMedicines() async {
  // try {
  //   final token = GetStorage().read('token');
  //   final headers = token != null ? <String, String>{'Authorization': 'Bearer ${token.toString()}'} : <String, String>{};
  //   final response = await ApiManager.instance.makeApiCall(
  //     callName: 'fetchAllMedicines',
  //     apiUrl: '$baseUrl/medicines',
  //     callType: ApiCallType.GET,
  //     headers: headers,
  //   );
  //   if (response.statusCode == 200) {
  //     final data = response.jsonBody;
  //     if (data['success'] == true && data['data'] != null) {
  //       return (data['data'] as List)
  //           // .map((e) => MedicineModel.fromJson(e))
  //           .toList();
  //     }
  //   } else {
  //     // print('[ERROR] fetchAllMedicines: statusCode=[31m${response.statusCode}[0m, body=${response.bodyText}');
  //     // throw Exception('Failed to load medicines: status=${response.statusCode}, body=${response.bodyText}');
  //   }
  //   // throw Exception('Failed to load medicines: Unexpected response');
  // } catch (e, stack) {
  //   // print('[EXCEPTION] fetchAllMedicines: $e\n$stack');
  //   rethrow;
  // }
// }

  // Helper to get medicine by id from a list
  static MedicineModel? getMedicineById(List<MedicineModel> medicines, String id) {
    try {
      return medicines.firstWhere((med) => med.id == id);
    } catch (_) {
      return null;
    }
  }
}
