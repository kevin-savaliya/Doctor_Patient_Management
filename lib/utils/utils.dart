import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:get/get.dart';
import 'package:patient_dev/theme/colors.dart';
import 'package:patient_dev/utils/app_font.dart';
import 'package:patient_dev/utils/assets.dart';
import 'package:toastification/toastification.dart';

void showInSnackBar(
  BuildContext context,
  String? message, {
  String? title,
  SnackPosition? position,
  bool isSuccess = false,
  Duration? duration,
  Color? color,
}) {
  toastification.show(
      context: context,
      title: Text(
        title ?? 'Silver Beverages',
        style: Theme.of(context).textTheme.titleMedium!.copyWith(
            color: AppColors.darkPrimaryColor, fontFamily: AppFont.fontRegular),
      ),
      description: Text(
        message!,
        style: Theme.of(context)
            .textTheme
            .titleMedium!
            .copyWith(fontFamily: AppFont.fontRegular, fontSize: 14),
      ),
      style: ToastificationStyle.minimal,
      type: isSuccess ? ToastificationType.success : ToastificationType.error,
      backgroundColor: Colors.white,
      borderRadius: BorderRadius.circular(12),
      showProgressBar: false,
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 15),
      closeOnClick: false,
      closeButtonShowType: CloseButtonShowType.none,
      autoCloseDuration: const Duration(milliseconds: 2500),
      direction: TextDirection.ltr,
      boxShadow: [
        BoxShadow(
            offset: const Offset(1, 3),
            blurRadius: 1,
            spreadRadius: 1,
            color: AppColors.txtGrey.withOpacity(0.1))
      ],
      foregroundColor: AppColors.darkPrimaryColor,
      icon: SvgPicture.asset(
        isSuccess ? AppIcons.checkFill : AppIcons.closeFill,
        color: isSuccess ? AppColors.success : AppColors.failure,
      ));
}

void toast({
  required String message,
  ToastGravity? gravity,
  bool isSuccess = false,
  Color? color,
}) {
  Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_LONG,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: AppColors.black.withOpacity(0.8),
      textColor: AppColors.white);
}
