class ConstString {
  // ---------------------------- Authentication Error Codes ---------------------------- //

  static const String invalidVerificationCode = "invalid-verification-code";
  static const String invalidPhoneNumber = 'invalid-phone-number';
  static const String networkRequestFailed = 'network-request-failed';
  static const String userDisabled = 'user-disabled';
  static const String alreadyInUse = 'credential-already-in-use';
  static const String sessionExpired = "session-expired";
  static const String quotaExceed = "quota-exceeded";
  static const String tooManyRequest = "too-many-requests";
  static const String captchaCheckFailed = 'captcha-check-failed';
  static const String missingPhoneNumber = 'missing-phone-number';

// ---------------------------- Authentication Error Messages ---------------------------- //
  static const String tooManyRequestMessage =
      "To ensure the safety of your account, we've temporarily disabled access from this device due to suspicious activity. Please try again later.";
  static const String captchaFailedMessage =
      "Unable to verify Captcha. Please try again later.";
  static const String missingPhoneNumberMessage =
      "Missing phone number. Please make sure to provide a valid contact number.";
  static const String quotaExceedMessage =
      "The requested operation cannot be completed as it exceeds the project quota limit.";
  static const String sessionExpiredMessage =
      "The sms code has expired. Please re-send the verification code";
  static const String invalidVerificationMessage =
      "Oops! The OTP you entered is invalid. Please check and try again.";
  static const String emptyPhoneNumber = "Phone number is required!";
  static const String invalidPhoneFormat =
      "The format of the phone number provided is incorrect";
  static const String invalidPhoneMessage = "Invalid Phone Number";
  static const String emptyPhoneNumberMessage = "Required Phone Number";
  static const String checkNetworkConnection =
      'Check Your Network Connection and try again';
  static const String accountDisabled =
      "Your account has been disabled by an admin";
  static const String phoneAlreadyInUse =
      "This phone number is already used by another existing user. Please enter different number";
  static const String canNotOpenProfile =
      "Sorry, you can't access your own profile from this section.";

  static const String successLogin = 'You are logged-in successfully';
  static const String otpSent = 'OTP is sent to your mobile number';
  static const String enterOtp = "Enter OTP";
  static const String enterOtpMessage = "Please Enter OTP";

  static const String validPostCode = "Please enter valid postcode";
  static const String somethingWentWrong = "Something went wrong";
  static const String enterPostCode = "Please enter postcode";
  static const String enterValidPostCode = "Please enter valid postcode";
  static const String chooseImage = "Please choose image";
  static const String noMoreReaction = "No More Reaction";
  static const String noMoreTopic = "Topick has expired";
  static const String noProfileUploaded = "No Profile Image Uploaded";
  static const String newTopickComingSoon = "New Topick coming soon.";
  static const String noLeaderboardData = "No scores are available";
  static const String noComment = "No Comments";

  static const String noConnection = "No internet connection";
  static const String loginToViewCartItems = "Login to view your cart items";
  static const String loginToViewFav = "Login to view your favourites";
  static const String deleteAccountDialogue =
      "Do you wish to delete your account?";
  static const String cancelOrderDialogue = "Do you want to cancel your order?";

  static const String searchExpenses = "Search Expenses";
  static const String searchMembers = "Search Members";

  static const String cancel = "Cancel";
  static const String logoutDialogue = "Logout";
  static const String entryDialogue = "Add Entry";
}
