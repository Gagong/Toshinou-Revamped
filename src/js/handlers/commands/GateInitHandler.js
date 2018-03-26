/*
Created by Freshek on 04.11.2017
*/

class GateInitHandler {
  static get ID() {
    return 7257;
  }

  constructor() {
    this._handler = function(e, a) {
      var parsedJson = JSON.parse(e.detail);
      /*console.log(parsedJson);*/
      a.gates.push(new Gate(parsedJson.x, parsedJson.y, parsedJson.factionId, parsedJson[Variables.gateJumpId]));
    }
  }

  get handler() {
    return this._handler;
  }
}
