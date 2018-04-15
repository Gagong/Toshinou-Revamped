class JavaScriptChecker {
  static safetyCheck() {
    var jsHashes = {};

    jsHashes["https://www.googletagmanager.com/gtm.js"] = "f3680923db0f5a1bb7d2a5831c404880";
    jsHashes["https://darkorbit-22.bpsecure.com/js/function.js"] = "8fd87941fb7d1b7ced05590b0e15c0f3";
    jsHashes["https://darkorbit-22.bpsecure.com/js/jQuery/jquery-1.4.4.js"] = "73a9c334c5ca71d70d092b42064f6476";
    jsHashes["https://darkorbit-22.bpsecure.com/js/jQuery/jquery.flashembed.js"] = "ed010c8f12b11c855ee9c833acdbd9c3";
    jsHashes["https://darkorbit-22.bpsecure.com/resources/js/tools.js"] = "dbf397d8f53a66282288cd58ecd1ef06";
    jsHashes["https://darkorbit-22.bpsecure.com/resources/js/tools/text.js"] = "2e6eb7691f4af6a4db0ed7184159ce68";
    jsHashes["https://assets.bpsecure.com/eventstream/eventstream.js"] = "cc7ed3fabc5fafba1280bfbf6ca81a75";
    jsHashes["https://darkorbit-22.bpsecure.com/resources/js/tools/popup.js"] = "7fa3aa8618c738cdf12bceb763b4bf6a";
    jsHashes["https://darkorbit-22.bpsecure.com/resources/js/tools/errorHandler.js"] = "e28fe3fd582bcb0eb8baf8b3c4f9ad48";
    jsHashes["https://darkorbit-22.bpsecure.com/resources/js/library.js"] = "a3c8d3e4f0d23405a758131039a03d0c";
    jsHashes["https://darkorbit-22.bpsecure.com/resources/js/internalMapRevolution.js"] = "0041b761cda1300c6619fae60e26a88a";
    jsHashes["https://assets.bpsecure.com/bpid/bpid.js"] = "9b176f19cbd4ee92cf8ec378493282cd";

    var scripts = $("script");

    var result = true;

    if (scripts.length != 20)
      result = false;

    scripts.each(function () {
      if (this.src != null && this.src.length != 0 && !this.src.startsWith("https://www.googletagmanager.com/gtm.js")) {
        var script = WebClient.get(this.src);

        var hash = md5(script);

        var rSrc = this.src.substr(0, this.src.indexOf("?"));

        if (jsHashes[rSrc] != hash) {
          // console.log(this.src + " → " + hash);
          result = false;
          return false;
        }

        if (script.indexOf("preloader") != -1) {
          result = false;
          return false; // stops the loop
        }
      }
    });

    return result;
  }
}