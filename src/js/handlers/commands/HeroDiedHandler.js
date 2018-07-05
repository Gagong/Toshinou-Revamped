/*
Created by Freshek on 13.11.2017
*/

class HeroDiedHandler {
  static get ID() {
    return 20873;
  }

  constructor() {
    this._handler = function (e, a) {
      var parsedJson = JSON.parse(e.detail);
      a.markHeroAsDead();

      window.setTimeout(function () {
        if (parsedJson.options.length >= 2 && window.settings.reviveAtGate && (window.settings.reviveLimit == 0 || window.settings.reviveLimit > window.reviveCount)) {
          Injector.injectScript("document.getElementById('preloader').revive(1);");
          window.reviveCount++;
          a.isRepairing = true;
          window.fleeingGate = null;
          window.fleeingFromEnemy = null;
        }
      }, 8000);
    }
  }

  get handler() {
    return this._handler;
  }
}