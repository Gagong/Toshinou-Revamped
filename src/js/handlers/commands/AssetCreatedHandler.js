class AssetCreatedHandler {
  static get ID() {
    return 23109;
  }

  constructor() {
    this._handler = function (e, a) {
      let parsedCmd = JSON.parse(e.detail);
      /*console.log(parsedCmd);*/

      let typeObj = parsedCmd.type;
      let type = parseInt(typeObj[Object.keys(typeObj)[0]]);

      let x = parsedCmd[Variables.assetCreateX];
      let y = parsedCmd[Variables.assetCreateY];

      if (type == 35 || type == 36) { // cbs
        if (api.battlestation == null) {
          api.battlestation = new Battlestation(x, y, parsedCmd.assetId, parsedCmd.userName, parsedCmd.clanTag, parsedCmd.factionId);
        } else {
          api.battlestation.setPosition(x, y);
          api.battlestation.id = parsedCmd.assetId;
          api.battlestation.name = parsedCmd.userName;
          api.battlestation.clanTag = parsedCmd.clanTag;
          api.battlestation.factionId = parsedCmd.factionId;
        }
      }

      if (type == 37) { // module
        if (api.battlestation == null)
          api.battlestation = new Battlestation();

        api.battlestation.modules[parsedCmd.assetId] = new BattlestationModule(x, y, parsedCmd.userName, parsedCmd.factionId);
      }
    }
  }

  get handler() {
    return this._handler;
  }
}