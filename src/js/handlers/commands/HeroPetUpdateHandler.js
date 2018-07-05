/*
 * Gets called when pet is started, pet destroys a target, pet recieves damage
 * jumping a gate, and ocasionally updates from time to time.
*/

class HeroPetUpdateHandler {
    static get ID() {
      return 7991;
    }
  
    constructor() {
      this._handler = function (e, a) {
        var parsedJson = JSON.parse(e.detail);

        if (window.pet == null) {
            window.pet = new Pet(parsedJson[Variables.heroPetId]);
        }
      }
    }
  
    get handler() {
      return this._handler;
    }
  }