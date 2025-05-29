import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:patient_dev/controller/splash_controller.dart';
import 'package:patient_dev/theme/colors.dart';
import 'package:patient_dev/utils/assets.dart';

class SplashScreen extends GetWidget<SplashController> {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder(
      init: SplashController(),
      builder: (controller) {
        return Scaffold(
          backgroundColor: AppColors.primaryColor,
          body: Stack(
            children: [
              // Positioned(
              //   top: 40,
              //   left: -60,
              //   child: Opacity(
              //     opacity: 0.15,
              //     child: Icon(Icons.eco, size: 300, color: Colors.white,),
              //   ),
              // ),
              Positioned(
                bottom: -20,
                right: -50,
                child: Opacity(
                  opacity: 0.18,
                  child: Icon(Icons.local_florist_outlined, size: 180, color: Colors.white),
                ),
              ),Positioned(
                top: 150,
                left: -250,
                child: Opacity(
                  opacity: 0.18,
                  child: Icon(Icons.local_florist, size: 500, color: Colors.white),
                ),
              ),
              // Centered logo and app name
              Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    SvgPicture.asset(AppImages.medic_white_text, height: 60),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}