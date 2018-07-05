/*
Created by Freshek on 21.10.2017
*/

class SafetyChecker {
  static check() {
    var jsCheck = JavaScriptChecker.safetyCheck();

    if (!jsCheck) {
      return "GAME UPDATE - UNSAFE_JS";
    }

    return true;
  }
}