/*
Created by Freshek on 04.11.2017
*/

class GateInitHandler {
  static get ID() {
    return 10886;
  }

  constructor() {
    this._handler = function (e, a) {
      var parsedJson = JSON.parse(e.detail);
      a.gates.push(new Gate(parsedJson.x, parsedJson.y, parsedJson.factionId, parsedJson[Variables.gateId]));
    }
  }

  get handler() {
    return this._handler;
  }
}