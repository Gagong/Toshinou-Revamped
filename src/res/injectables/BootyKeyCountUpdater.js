window.setInterval(function () {
  if (!window.heroDied) {
    var response = document.getElementById("preloader").getBootyKeyCount();
    document.dispatchEvent(new CustomEvent("updateBootyKeyCount", {
      detail: response
    }));
  }
}, 2500);