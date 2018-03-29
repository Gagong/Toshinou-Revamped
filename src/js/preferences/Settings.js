class Settings {
  constructor(collectBoxes, collectMaterials, moveRandomly, lockNpc, lockPlayers, killNpcs, runfromenemy, pause, palladium) {
    this._collectBoxes = collectBoxes === true;
    this._collectMaterials = collectMaterials === true;
    this._moveRandomly = moveRandomly === true;
    this._lockNpc = lockNpc === true;
    this._lockPlayers = lockPlayers === true;
    this._killNpcs = killNpcs === true;
    this._npcs = [];
    this._runfromenemy = runfromenemy === true;
    this.npcCircleRadius = 500;
    this.reviveLimit = 5;
    this._pause = pause === true;
    this._palladium = palladium === true;
  }

  get Palladium() {
    return this._palladium;
  }

  set Palladium(value) {
    this._palladium = value === true;
  }

  get collectBoxes() {
    return this._collectBoxes;
  }

  set collectBoxes(value) {
    this._collectBoxes = value === true;
  }

  get collectMaterials() {
    return this._collectMaterials;
  }

  set collectMaterials(value) {
    this._collectMaterials = value === true;
  }

  get moveRandomly() {
    return this._moveRandomly;
  }

  set moveRandomly(value) {
    this._moveRandomly = value === true;
  }

  get lockNpc() {
    return this._lockNpc;
  }

  set lockNpc(value) {
    this._lockNpc = value === true;
  }

  get lockPlayers() {
    return this._lockPlayers;
  }

  set lockPlayers(value) {
    this._lockPlayers = value === true;
  }

  get killNpcs() {
    return this._killNpcs;
  }

  set killNpcs(value) {
    this._killNpcs = value === true;
  }

  get runfromenemy() {
    return this._runfromenemy;
  }

  set runfromenemy(value) {
    this._runfromenemy = value === true;
  }

  setNpc(name, val) {
    this._npcs[name] = val;
  }

  getNpc(name) {
    return !this._npcs[name];
  }

  setPause(value) {
    this._pause = value === true;
  }

  getPause() {
    return this._pause;
  }
}
