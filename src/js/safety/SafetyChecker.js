class SafetyChecker {
  static check() {
    var jsCheck = JavaScriptChecker.safetyCheck();

    if (!jsCheck) {
      return "GAME UPDATE - UNSAFE_JS";
    }

    return true;
  }
}