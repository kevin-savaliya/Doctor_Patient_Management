class Patient {
  final String? id;
  final String? firstName;
  final String? lastName;
  final String? email;
  final String? mobile;
  final String? dob;
  final String? gender;
  final String? address;
  final String? profileImage;
  final String? joinDate;
  final String? role;
  final bool? isDeleted;
  final String? createdAt;
  final String? updatedAt;

  Patient({
    this.id,
    this.firstName,
    this.lastName,
    this.email,
    this.mobile,
    this.dob,
    this.gender,
    this.address,
    this.profileImage,
    this.joinDate,
    this.role,
    this.isDeleted,
    this.createdAt,
    this.updatedAt,
  });

  factory Patient.fromJson(Map<String, dynamic> json) {
    return Patient(
      id: json['_id'] ?? json['id'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      email: json['email'],
      mobile: json['mobile'],
      dob: json['dob'],
      gender: json['gender'],
      address: json['address'],
      profileImage: json['profileImage'],
      joinDate: json['joinDate'],
      role: json['role'],
      isDeleted: json['isDeleted'],
      createdAt: json['createdAt'],
      updatedAt: json['updatedAt'],
    );
  }
}
