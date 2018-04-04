class Settings {
  constructor(moveRandomly, lockNpc, lockPlayers, killNpcs, pause, palladium, bonusbox, cargobox, matherials, booty) {
    /*this._collectBoxes = collectBoxes === true;*/
    this._moveRandomly = moveRandomly === true;
    this._lockNpc = lockNpc === true;
    this._lockPlayers = lockPlayers === true;
    this._killNpcs = killNpcs === true;
    this._npcs = [];
    /*this._betakilling = betakilling === true;*/
    this.npcCircleRadius = 500;
    this.reviveLimit = 5;
    this._pause = pause === true;
    this._palladium = palladium === true;
    this._bonusbox = bonusbox === true;
    this._cargobox = cargobox === true;
    /*this._palladiumbox = palladiumbox === true;*/
    this._matherials = matherials === true;
    this._booty = booty === true;
  }

  get Booty() {
    return this._booty;
  }

  set Booty(value) {
    this._booty = value === true;
  }

  get Palladium() {
    return this._palladium;
  }

  set Palladium(value) {
    this._palladium = value === true;
  }

  get Bonus() {
    return this._bonusbox;
  }

  set Bonus(value) {
    this._bonusbox = value === true;
  }

  get Cargo() {
    return this._cargobox;
  }

  set Cargo(value) {
    this._cargobox = value === true;
  }

  /*get Pall() {
    return this._palladiumbox;
  }

  set Pall(value) {
    this._palladiumbox = value === true;
  }*/

  get Matherials() {
    return this._matherials;
  }

  set Matherials(value) {
    this._matherials = value === true;
  }

  /*get collectBoxes() {
    return this._collectBoxes;
  }

  set collectBoxes(value) {
    this._collectBoxes = value === true;
  }*/

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

  /*get betakilling() {
    return this._betakilling;
  }

  set betakilling(value) {
    this._betakilling = value === true;
  }*/

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
