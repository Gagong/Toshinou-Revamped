class HeroDiedHandler {
    static get ID() {
        return 20873;
    }

    constructor() {
        this._handler = function (e, a) {
            let parsedJson = JSON.parse(e.detail);

            a.markHeroAsDead();

            window.setTimeout(function () {
                if (parsedJson.options.length >= 2 && (window.settings.reviveLimit == 0 || window.settings.reviveLimit > window.reviveCount)) {
                    if (window.settings.reviveAtBase)
                        Injector.injectScript("document.getElementById('preloader').revive(0);");
                    else if (window.settings.reviveAtGate)
                        Injector.injectScript("document.getElementById('preloader').revive(1);");
                    
                    window.reviveCount++;
                    a.isRepairing = true;

                    let event = new CustomEvent("deathCounter", {
                        detail: {
                            death: 1,
                        }
                    });
                    window.dispatchEvent(event);
                }
            }, 8000);
        }
    }

    get handler() {
        return this._handler;
    }
}