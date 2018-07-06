class AssetCreatedHandler {
  static get ID() {
    return 27221;
  }

  constructor() {
    this._handler = function (e, a) {
      let parsedCmd = JSON.parse(e.detail);

      let typeObj = parsedCmd.type;
      let type = parseInt(typeObj[Object.keys(typeObj)[0]]);

      let x = parsedCmd[Variables.assetCreateX];
      let y = parsedCmd[Variables.assetCreateY];

      if (type == 35 || type == 36) {
        if (api.battlestation == null) {
          api.battlestation = new Battlestation(x, y, parsedCmd.assetId, parsedCmd.userName, parsedCmd.clanTag, parsedCmd.factionId, parsedCmd[Variables.battlestationClanDiplomacy].type);
        } else {
          api.battlestation.setPosition(x, y);
          api.battlestation.id = parsedCmd.assetId;
          api.battlestation.name = parsedCmd.userName;
          api.battlestation.clanTag = parsedCmd.clanTag;
          api.battlestation.factionId = parsedCmd.factionId;
        }
      }

      if (type == 37) {
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
