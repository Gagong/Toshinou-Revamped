window.setInterval(function () {
  if (!window.heroDied) {
    var response = document.getElementById("preloader").getHero();
    /*console.log(response);*/
    document.dispatchEvent(new CustomEvent("updateHeroPos", {
      detail: response
    }));
  }
}, 300);