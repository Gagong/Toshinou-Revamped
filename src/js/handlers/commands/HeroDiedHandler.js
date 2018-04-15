class HeroDiedHandler {
  static get ID() {
    return 21407;
  }

  constructor() {
    this._handler = function (e, a) {
      var parsedJson = JSON.parse(e.detail);
      /*console.log(parsedJson);*/
      a.markHeroAsDead();

      window.setTimeout(function () {
        if (parsedJson.options.length >= 2 && window.settings.reviveAtGate && (window.settings.reviveLimit == 0 || window.settings.reviveLimit > window.reviveCount)) {
          Injector.injectScript("document.getElementById('preloader').revive(1);");
          window.reviveCount++;
          a.isRepairing = true;
        }
        /*if (parsedJson.options.length >= 2 && window.settings.reviveAtHeroPos && (window.settings.reviveLimit == 0 || window.settings.reviveLimit > window.reviveCount)) {
          Injector.injectScript("document.getElementById('preloader').revive(2);");
          window.reviveCount++;
          a.isRepairing = true;
        }*/
      }, 8000);
    }
  }

  get handler() {
    return this._handler;
  }
}