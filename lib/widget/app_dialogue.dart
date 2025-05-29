// import 'package:flutter/material.dart';
// import 'package:get/get.dart';
// import 'package:loading_indicator/loading_indicator.dart';
// import 'package:silver_beverages/controller/auth_controller.dart';
// import 'package:silver_beverages/controller/product_controller.dart';
// import 'package:silver_beverages/model/bill_data.dart';
// import 'package:silver_beverages/theme/colors.dart';
// import 'package:silver_beverages/utils/app_font.dart';
// import 'package:silver_beverages/utils/string.dart';
// import 'package:silver_beverages/utils/utils.dart';
//
// Future payViaDialogue(BuildContext context, BillData bill) {
//   ProductController controller = Get.find<ProductController>();
//   return showDialog(
//     barrierDismissible: false,
//     context: context,
//     builder: (context) {
//       return AlertDialog(
//         insetPadding: const EdgeInsets.symmetric(horizontal: 20),
//         backgroundColor: AppColors.white,
//         contentPadding: EdgeInsets.zero,
//         shape: OutlineInputBorder(
//             borderSide: BorderSide.none,
//             borderRadius: BorderRadius.circular(24)),
//         alignment: Alignment.center,
//         title: Column(
//           children: [
//             Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: [
//                 Text(
//                   "Pay vie",
//                   style: Theme.of(context).textTheme.titleLarge!.copyWith(
//                         color: AppColors.darkPrimaryColor,
//                         fontWeight: FontWeight.w600,
//                         fontFamily: AppFont.fontRegular,
//                       ),
//                 ),
//                 GestureDetector(
//                   onTap: () {
//                     Get.back();
//                   },
//                   child: Icon(
//                     Icons.close,
//                     color: AppColors.txtGrey,
//                     size: 18,
//                   ),
//                 )
//               ],
//             ),
//             const SizedBox(height: 20),
//             Obx(() => SizedBox(
//                   height: 40,
//                   child: RadioListTile<String>(
//                     controlAffinity: ListTileControlAffinity.trailing,
//                     selected: true,
//                     activeColor: AppColors.primaryColor,
//                     contentPadding: EdgeInsets.zero,
//                     dense: true,
//                     title: Text(
//                       'Cash',
//                       style: Theme.of(context).textTheme.titleMedium!.copyWith(
//                             color: AppColors.darkPrimaryColor,
//                             fontFamily: AppFont.fontRegular,
//                           ),
//                     ),
//                     value: 'Cash',
//                     groupValue: controller.selectedPaymentOption.value,
//                     onChanged: (value) {
//                       controller.selectedPaymentOption.value = value!;
//                     },
//                   ),
//                 )),
//             Obx(() => SizedBox(
//                   height: 40,
//                   child: RadioListTile<String>(
//                     controlAffinity: ListTileControlAffinity.trailing,
//                     selected: true,
//                     activeColor: AppColors.primaryColor,
//                     contentPadding: EdgeInsets.zero,
//                     dense: true,
//                     title: Text(
//                       'Online',
//                       style: Theme.of(context).textTheme.titleMedium!.copyWith(
//                             color: AppColors.darkPrimaryColor,
//                             fontFamily: AppFont.fontRegular,
//                           ),
//                     ),
//                     value: 'Online',
//                     groupValue: controller.selectedPaymentOption.value,
//                     onChanged: (value) {
//                       controller.selectedPaymentOption.value = value!;
//                     },
//                   ),
//                 )),
//             Obx(
//               () => SizedBox(
//                 height: 40,
//                 child: RadioListTile<String>(
//                   controlAffinity: ListTileControlAffinity.trailing,
//                   selected: true,
//                   activeColor: AppColors.primaryColor,
//                   contentPadding: EdgeInsets.zero,
//                   dense: true,
//                   title: Text(
//                     'Unpaid',
//                     style: Theme.of(context).textTheme.titleMedium!.copyWith(
//                           color: AppColors.darkPrimaryColor,
//                           fontFamily: AppFont.fontRegular,
//                         ),
//                   ),
//                   value: 'Unpaid',
//                   groupValue: controller.selectedPaymentOption.value,
//                   onChanged: (value) {
//                     controller.selectedPaymentOption.value = value!;
//                   },
//                 ),
//               ),
//             ),
//             const SizedBox(height: 20),
//             Row(
//               children: [
//                 Expanded(
//                   child: ElevatedButton(
//                       onPressed: () {
//                         Get.back();
//                       },
//                       style: ElevatedButton.styleFrom(
//                           backgroundColor: AppColors.navigationColor,
//                           fixedSize: const Size(200, 45),
//                           elevation: 0,
//                           shape: RoundedRectangleBorder(
//                               borderRadius: BorderRadius.circular(30))),
//                       child: Text(
//                         "Cancel",
//                         style: Theme.of(context).textTheme.titleSmall!.copyWith(
//                             color: AppColors.darkPrimaryColor,
//                             fontSize: 14,
//                             fontFamily: AppFont.fontRegular),
//                       )),
//                 ),
//                 const SizedBox(
//                   width: 15,
//                 ),
//                 Expanded(
//                   child: ElevatedButton(
//                       onPressed: () async {
//                         if (controller.selectedPaymentOption.isNotEmpty) {
//                           Get.back();
//                           BillData billData = BillData(
//                             date: bill.date,
//                             billNo: bill.billNo,
//                             customerData: bill.customerData,
//                             productsData: bill.productsData,
//                             totalQty: bill.totalQty,
//                             paymentMethod:
//                                 controller.selectedPaymentOption.value,
//                             totalAmount: bill.totalAmount,
//                           );
//                           await payByDialogue(context, billData);
//                         } else {
//                           showInSnackBar(
//                               context, "Please select payment method");
//                         }
//                       },
//                       style: ElevatedButton.styleFrom(
//                           backgroundColor: AppColors.primaryColor,
//                           fixedSize: const Size(200, 45),
//                           elevation: 0,
//                           shape: RoundedRectangleBorder(
//                               borderRadius: BorderRadius.circular(30))),
//                       child: Text(
//                         "Save",
//                         style: Theme.of(context).textTheme.titleSmall!.copyWith(
//                             color: AppColors.white,
//                             fontSize: 14,
//                             fontFamily: AppFont.fontRegular),
//                       )),
//                 ),
//               ],
//             ),
//             const SizedBox(height: 5),
//           ],
//         ),
//       );
//     },
//   );
// }
//
// Future payByDialogue(BuildContext context, BillData bill) {
//   ProductController controller = Get.find<ProductController>();
//   return showDialog(
//     barrierDismissible: false,
//     context: context,
//     builder: (context) {
//       return AlertDialog(
//         insetPadding: const EdgeInsets.symmetric(horizontal: 20),
//         backgroundColor: AppColors.white,
//         contentPadding: EdgeInsets.zero,
//         shape: OutlineInputBorder(
//             borderSide: BorderSide.none,
//             borderRadius: BorderRadius.circular(24)),
//         alignment: Alignment.center,
//         title: Column(
//           children: [
//             Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: [
//                 Text(
//                   "Pay by Cash",
//                   style: Theme.of(context).textTheme.titleLarge!.copyWith(
//                         color: AppColors.darkPrimaryColor,
//                         fontWeight: FontWeight.w600,
//                         fontFamily: AppFont.fontRegular,
//                       ),
//                 ),
//                 GestureDetector(
//                   onTap: () {
//                     Get.back();
//                   },
//                   child: Icon(
//                     Icons.close,
//                     color: AppColors.txtGrey,
//                     size: 18,
//                   ),
//                 )
//               ],
//             ),
//             const SizedBox(height: 20),
//             Text(
//               "Are you sure ${bill.customerData!.name} amount is Rs ",
//               textAlign: TextAlign.center,
//               style: Theme.of(context).textTheme.titleMedium!.copyWith(
//                   height: 1.4,
//                   fontSize: 14,
//                   color: AppColors.darkPrimaryColor,
//                   fontFamily: AppFont.fontRegular),
//             ),
//             Padding(
//               padding: const EdgeInsets.symmetric(horizontal: 10),
//               child: Text(
//                 "${bill.totalAmount} is paid vie ${bill.paymentMethod}",
//                 textAlign: TextAlign.center,
//                 style: Theme.of(context).textTheme.titleMedium!.copyWith(
//                     height: 1.4,
//                     fontSize: 14,
//                     color: AppColors.primaryColor,
//                     fontFamily: AppFont.fontRegular),
//               ),
//             ),
//             const SizedBox(height: 20),
//             Row(
//               children: [
//                 Expanded(
//                   child: ElevatedButton(
//                       onPressed: () {
//                         Get.back();
//                       },
//                       style: ElevatedButton.styleFrom(
//                           backgroundColor: AppColors.navigationColor,
//                           fixedSize: const Size(200, 45),
//                           elevation: 0,
//                           shape: RoundedRectangleBorder(
//                               borderRadius: BorderRadius.circular(30))),
//                       child: Text(
//                         "No",
//                         style: Theme.of(context).textTheme.titleSmall!.copyWith(
//                             color: AppColors.darkPrimaryColor,
//                             fontSize: 14,
//                             fontFamily: AppFont.fontRegular),
//                       )),
//                 ),
//                 const SizedBox(
//                   width: 15,
//                 ),
//                 Expanded(
//                   child: ElevatedButton(
//                       onPressed: () async {
//                         Get.back();
//                         showProgressDialogue(context);
//                         BillData? billData =
//                             await controller.addBillData(context, bill);
//                       },
//                       style: ElevatedButton.styleFrom(
//                           backgroundColor: AppColors.primaryColor,
//                           fixedSize: const Size(200, 45),
//                           elevation: 0,
//                           shape: RoundedRectangleBorder(
//                               borderRadius: BorderRadius.circular(30))),
//                       child: Text(
//                         "Yes",
//                         style: Theme.of(context).textTheme.titleSmall!.copyWith(
//                             color: AppColors.white,
//                             fontSize: 14,
//                             fontFamily: AppFont.fontRegular),
//                       )),
//                 ),
//               ],
//             ),
//             const SizedBox(height: 5),
//           ],
//         ),
//       );
//     },
//   );
// }
//
// Future deleteDialogue(BuildContext context, VoidCallback onTap, String title) {
//   return showDialog(
//     context: context,
//     builder: (context) {
//       return AlertDialog(
//         insetPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
//         backgroundColor: AppColors.white,
//         shape: OutlineInputBorder(
//             borderSide: BorderSide.none,
//             borderRadius: BorderRadius.circular(12)),
//         alignment: Alignment.center,
//         title: Column(
//           children: [
//             Text(
//               "Delete $title",
//               textScaler: const TextScaler.linear(1),
//               style: Theme.of(context).textTheme.titleLarge!.copyWith(
//                   color: AppColors.darkPrimaryColor,
//                   fontFamily: AppFont.fontRegular,
//                   fontWeight: FontWeight.w600),
//             ),
//             const SizedBox(height: 15),
//             Padding(
//               padding: const EdgeInsets.symmetric(horizontal: 10),
//               child: Text(
//                 "Are you sure you want to delete \nthis $title data?",
//                 textScaler: const TextScaler.linear(1),
//                 textAlign: TextAlign.center,
//                 style: Theme.of(context).textTheme.titleMedium!.copyWith(
//                     height: 1.4,
//                     fontSize: 14,
//                     color: AppColors.darkPrimaryColor,
//                     fontFamily: AppFont.fontRegular),
//               ),
//             ),
//             const SizedBox(height: 20),
//             Row(
//               children: [
//                 Expanded(
//                   child: ElevatedButton(
//                       onPressed: () {
//                         Get.back();
//                         showProgressDialogue(context);
//                         onTap();
//                       },
//                       style: ElevatedButton.styleFrom(
//                           backgroundColor: AppColors.debit,
//                           fixedSize: const Size(200, 45),
//                           elevation: 0,
//                           shape: RoundedRectangleBorder(
//                               borderRadius: BorderRadius.circular(30))),
//                       child: Text(
//                         "Yes",
//                         textScaler: const TextScaler.linear(1),
//                         style: Theme.of(context).textTheme.titleSmall!.copyWith(
//                             color: AppColors.white,
//                             fontSize: 14,
//                             fontFamily: AppFont.fontRegular),
//                       )),
//                 ),
//                 const SizedBox(
//                   width: 15,
//                 ),
//                 Expanded(
//                   child: ElevatedButton(
//                       onPressed: () async {
//                         Get.back();
//                       },
//                       style: ElevatedButton.styleFrom(
//                           backgroundColor: AppColors.borderGrey,
//                           fixedSize: const Size(200, 45),
//                           elevation: 0,
//                           shape: RoundedRectangleBorder(
//                               borderRadius: BorderRadius.circular(30))),
//                       child: Text(
//                         "No",
//                         textScaler: const TextScaler.linear(1),
//                         style: Theme.of(context).textTheme.titleSmall!.copyWith(
//                             color: AppColors.darkPrimaryColor,
//                             fontSize: 14,
//                             fontFamily: AppFont.fontRegular),
//                       )),
//                 ),
//               ],
//             ),
//             const SizedBox(height: 10),
//           ],
//         ),
//       );
//     },
//   );
// }
//
// Future showProgressDialogue(BuildContext context) {
//   return showDialog(
//     context: context,
//     barrierDismissible: false,
//     builder: (context) {
//       return Column(
//         crossAxisAlignment: CrossAxisAlignment.center,
//         mainAxisAlignment: MainAxisAlignment.center,
//         mainAxisSize: MainAxisSize.min,
//         children: [
//           SizedBox(
//               child: Column(
//             mainAxisAlignment: MainAxisAlignment.center,
//             children: [
//               Center(
//                   child: SizedBox(
//                 height: 70,
//                 width: 70,
//                 child: LoadingIndicator(
//                   colors: [AppColors.primaryColor],
//                   indicatorType: Indicator.ballScale,
//                   strokeWidth: 1,
//                 ),
//               )),
//             ],
//           )),
//         ],
//       );
//     },
//   );
// }
//
// Future logoutDialogue(BuildContext context) {
//   return showDialog(
//     context: context,
//     builder: (context) {
//       return AlertDialog(
//         insetPadding: const EdgeInsets.symmetric(horizontal: 20),
//         backgroundColor: AppColors.white,
//         shape: OutlineInputBorder(
//             borderSide: BorderSide.none,
//             borderRadius: BorderRadius.circular(12)),
//         alignment: Alignment.center,
//         title: Column(
//           children: [
//             Text(
//               ConstString.logoutDialogue,
//               textScaler: const TextScaler.linear(1),
//               style: Theme.of(context).textTheme.titleLarge!.copyWith(
//                   color: AppColors.darkPrimaryColor,
//                   fontFamily: AppFont.fontRegular,
//                   fontWeight: FontWeight.w600),
//             ),
//             const SizedBox(height: 12),
//             Padding(
//               padding: const EdgeInsets.symmetric(horizontal: 20),
//               child: Text(
//                 "Are you sure you want to logout?",
//                 textScaler: const TextScaler.linear(1),
//                 textAlign: TextAlign.center,
//                 style: Theme.of(context).textTheme.displayMedium!.copyWith(
//                     fontSize: 14, color: AppColors.txtGrey, letterSpacing: 0),
//               ),
//             ),
//             const SizedBox(height: 25),
//             Row(
//               children: [
//                 Expanded(
//                   child: ElevatedButton(
//                       onPressed: () {
//                         Get.back();
//                       },
//                       style: ElevatedButton.styleFrom(
//                           backgroundColor: AppColors.indGrey.withOpacity(0.5),
//                           fixedSize: const Size(200, 45),
//                           elevation: 0,
//                           shape: RoundedRectangleBorder(
//                               borderRadius: BorderRadius.circular(30))),
//                       child: Text(
//                         ConstString.cancel,
//                         textScaler: const TextScaler.linear(1),
//                         style: Theme.of(context)
//                             .textTheme
//                             .titleSmall!
//                             .copyWith(color: AppColors.txtGrey, fontSize: 14),
//                       )),
//                 ),
//                 const SizedBox(
//                   width: 15,
//                 ),
//                 Expanded(
//                   child: ElevatedButton(
//                       onPressed: () async {
//                         Get.back();
//                         showProgressDialogue(context);
//                         await AuthController.signOut();
//                         Get.back();
//                       },
//                       style: ElevatedButton.styleFrom(
//                           backgroundColor: AppColors.darkPrimaryColor,
//                           fixedSize: const Size(200, 45),
//                           elevation: 0,
//                           shape: RoundedRectangleBorder(
//                               borderRadius: BorderRadius.circular(30))),
//                       child: Text(
//                         ConstString.logoutDialogue,
//                         textScaler: const TextScaler.linear(1),
//                         style: Theme.of(context)
//                             .textTheme
//                             .titleSmall!
//                             .copyWith(color: AppColors.white, fontSize: 14),
//                       )),
//                 ),
//               ],
//             ),
//             const SizedBox(height: 10),
//           ],
//         ),
//       );
//     },
//   );
// }
//
// Future showConfirmationDialog(
//   BuildContext context, {
//   required String title,
//   required String message,
//   VoidCallback? onTap,
// }) {
//   return Get.dialog(AlertDialog(
//     insetPadding: const EdgeInsets.symmetric(horizontal: 20),
//     backgroundColor: AppColors.white,
//     shape: OutlineInputBorder(
//         borderSide: BorderSide.none, borderRadius: BorderRadius.circular(12)),
//     alignment: Alignment.center,
//     title: Column(
//       children: [
//         Text(
//           title,
//           textScaler: const TextScaler.linear(1),
//           style: Theme.of(context).textTheme.titleLarge!.copyWith(
//               color: AppColors.darkPrimaryColor,
//               fontFamily: AppFont.fontRegular,
//               fontWeight: FontWeight.w600),
//         ),
//         const SizedBox(height: 12),
//         Padding(
//           padding: const EdgeInsets.symmetric(horizontal: 20),
//           child: Text(
//             message,
//             textScaler: const TextScaler.linear(1),
//             textAlign: TextAlign.center,
//             style: Theme.of(context).textTheme.displayMedium!.copyWith(
//                 fontSize: 14, color: AppColors.txtGrey, letterSpacing: 0,height: 1.3),
//           ),
//         ),
//         const SizedBox(height: 25),
//         Row(
//           children: [
//             Expanded(
//               child: ElevatedButton(
//                   onPressed: () {
//                     Get.back();
//                   },
//                   style: ElevatedButton.styleFrom(
//                       backgroundColor: AppColors.indGrey.withOpacity(0.5),
//                       fixedSize: const Size(200, 45),
//                       elevation: 0,
//                       shape: RoundedRectangleBorder(
//                           borderRadius: BorderRadius.circular(30))),
//                   child: Text(
//                     ConstString.cancel,
//                     textScaler: const TextScaler.linear(1),
//                     style: Theme.of(context)
//                         .textTheme
//                         .titleSmall!
//                         .copyWith(color: AppColors.txtGrey, fontSize: 14),
//                   )),
//             ),
//             const SizedBox(
//               width: 15,
//             ),
//             Expanded(
//               child: ElevatedButton(
//                   onPressed: () async {
//                     Get.back();
//                     if (onTap != null) {
//                       onTap();
//                     }
//                   },
//                   style: ElevatedButton.styleFrom(
//                       backgroundColor: AppColors.primaryColor,
//                       fixedSize: const Size(200, 45),
//                       elevation: 0,
//                       shape: RoundedRectangleBorder(
//                           borderRadius: BorderRadius.circular(30))),
//                   child: Text(
//                     ConstString.entryDialogue,
//                     textScaler: const TextScaler.linear(1),
//                     style: Theme.of(context)
//                         .textTheme
//                         .titleSmall!
//                         .copyWith(color: AppColors.white, fontSize: 14),
//                   )),
//             ),
//           ],
//         ),
//         const SizedBox(height: 10),
//       ],
//     ),
//   ));
//   /*return showDialog(
//     context: context,
//     builder: (context) {
//       return ;
//     },
//   );*/
// }
