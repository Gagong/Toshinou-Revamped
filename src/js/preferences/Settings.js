class Settings {
  constructor(moveRandomly, lockNpc, lockPlayers, autoattack, killNpcs, pause, palladium, bonusbox, cargobox, matherials, runfromenemy, zeta, alpha, beta, gamma, booty, rbooty, bbooty, msqbooty) {
    this._moveRandomly = moveRandomly === true;
    this._lockNpc = lockNpc === true;
    this._lockPlayers = lockPlayers === true;
    this._autoattack = autoattack === true;
    this._killNpcs = killNpcs === true;
    this._npcs = [];
    this.npcCircleRadius = 500;
    this.reviveLimit = 5;
    this._pause = pause === true;
    this._palladium = palladium === true;
    this._bonusbox = bonusbox === true;
    this._cargobox = cargobox === true;
    this._matherials = matherials === true;
    this._runfromenemy = runfromenemy === true;
    this._zeta = zeta === true;
    this._alpha = alpha === true;
    this._beta = beta === true;
    this._gamma = gamma === true;
    this._booty = booty === true;
    this._rbooty = rbooty === true;
    this._bbooty = bbooty === true;
    this._msqbooty = msqbooty === true;
  }

  get AA() {
    return this._autoattack;
  }

  set AA(value) {
    this._autoattack = value === true;
  }

  get MSQBooty() {
    return this._msqbooty;
  }

  set MSQBooty(value) {
    this._msqbooty = value === true;
  }

  get BBooty() {
    return this._bbooty;
  }

  set BBooty(value) {
    this._bbooty = value === true;
  }

  get RBooty() {
    return this._rbooty;
  }

  set RBooty(value) {
    this._rbooty = value === true;
  }

  get Zeta() {
    return this._zeta;
  }

  set Zeta(value) {
    this._zeta = value === true;
  }

  get Alpha() {
    return this._alpha;
  }

  set Alpha(value) {
    this._alpha = value === true;
  }

  get Beta() {
    return this._beta;
  }

  set Beta(value) {
    this._beta = value === true;
  }

  get Gamma() {
    return this._gamma;
  }

  set Gamma(value) {
    this._gamma = value === true;
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

  get Matherials() {
    return this._matherials;
  }

  set Matherials(value) {
    this._matherials = value === true;
  }

  get Flee() {
    return this._runfromenemy;
  }

  set Flee(value) {
    this._runfromenemy = value === true;
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
