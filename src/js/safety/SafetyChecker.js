class SafetyChecker {
  static check() {
    let jsCheck = JavaScriptChecker.safetyCheck();

    if (!jsCheck) {
      return "GAME UPDATE - UNSAFE_JS";
    }

    return true;
  }
}