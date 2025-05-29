class MedicineModel {
  final String id;
  final String name;
  final String strength;
  final String form;
  final String manufacturer;

  MedicineModel({
    required this.id,
    required this.name,
    required this.strength,
    required this.form,
    required this.manufacturer,
  });

  factory MedicineModel.fromJson(Map<String, dynamic> json) {
    return MedicineModel(
      id: json['_id'],
      name: json['name'] ?? '',
      strength: json['strength'] ?? '',
      form: json['form'] ?? '',
      manufacturer: json['manufacturer'] ?? '',
    );
  }

  @override
  String toString() {
    return '[32m$name ($strength, $form) - $manufacturer[0m';
  }
}
