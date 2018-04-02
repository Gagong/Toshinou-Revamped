window.setInterval(function() {
  var updatever = document.getElementById("preloader").getGameVersion();
  document.dispatchEvent(new CustomEvent("getVer", {detail: updatever}));
}, 300);
