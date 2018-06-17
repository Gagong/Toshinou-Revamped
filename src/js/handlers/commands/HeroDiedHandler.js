class HeroDiedHandler {
  static get ID() {
    return 6669;
  }

  constructor() {
    this._handler = function (e, a) {
      let parsedJson = JSON.parse(e.detail);

      a.markHeroAsDead();

      window.setTimeout(function () {
        if (parsedJson.options.length >= 2 && window.settings.reviveAtGate && (window.settings.reviveLimit == 0 || window.settings.reviveLimit > window.reviveCount)) {
          Injector.injectScript("document.getElementById('preloader').revive(1);");
          window.reviveCount++;
          a.isRepairing = true;
          let event = new CustomEvent("deathCounter", {
            detail: {
              death: 1,
            }
          });
          window.dispatchEvent(event);
        }else if (parsedJson.options.length >= 2 && window.settings.reviveAtBase && (window.settings.reviveLimit == 0 || window.settings.reviveLimit > window.reviveCount)) {
		  Injector.injectScript("document.getElementById('preloader').revive(0);");
          window.reviveCount++;
          a.isRepairing = true;
          let event = new CustomEvent("deathCounter", {
            detail: {
              death: 1,
            }
          });
		}
      }, 8000);
    }
  }

  get handler() {
    return this._handler;
  }
}