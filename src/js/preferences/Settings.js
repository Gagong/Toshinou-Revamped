class Settings {
  constructor(moveRandomly, 
              lockNpc, 
              lockPlayers, 
              autoAttack, 
              killNpcs, 
              pause, 
              palladium, 
              bonusBox, 
              cargoBox, 
              material, 
              runFromEnemy, 
              zeta, 
              alpha, 
              beta, 
              gamma, 
              delta, 
              kappa, 
              greenAndGoldBooty, 
              redBooty, 
              blueBooty, 
              masqueBooty, 
              blackBooty) 
  {
    this._moveRandomly = moveRandomly === true;
    this._lockNpc = lockNpc === true;
    this._lockPlayers = lockPlayers === true;
    this._autoAttack = autoAttack === true;
    this._killNpcs = killNpcs === true;
    this._npcs = [];
    this.npcCircleRadius = 500;
    this.reviveLimit = 5;
    this._pause = pause === true;
    this._palladium = palladium === true;
    this._bonusBox = bonusBox === true;
    this._cargoBox = cargoBox === true;
    this._material = material === true;
    this._runFromEnemy = runFromEnemy === true;
    this._zeta = zeta === true;
    this._alpha = alpha === true;
    this._beta = beta === true;
    this._gamma = gamma === true;
    this._delta = delta === true;
    this._kappa = kappa === true;
    this._greenAndGoldBooty = greenAndGoldBooty === true;
    this._redBooty = redBooty === true;
    this._blueBooty = blueBooty === true;
    this._masqueBooty = masqueBooty === true;
    this._blackBooty = blackBooty === true;
  }

  get autoAttack() {
    return this._autoAttack;
  }

  set autoAttack(value) {
    this._autoAttack = value === true;
  }

  get masqueBooty() {
    return this._masqueBooty;
  }

  set masqueBooty(value) {
    this._masqueBooty = value === true;
  }

  get blackBooty() {
    return this._blackBooty;
  }

  set blackBooty(value) {
    this._blackBooty = value === true;
  }

  get blueBooty() {
    return this._blueBooty;
  }

  set blueBooty(value) {
    this._blueBooty = value === true;
  }

  get redBooty() {
    return this._redBooty;
  }

  set redBooty(value) {
    this._redBooty = value === true;
  }

  get kappa() {
    return this._kappa;
  }

  set kappa(value) {
    this._kappa = value === true;
  }

  get delta() {
    return this._delta;
  }

  set delta(value) {
    this._delta = value === true;
  }

  get zeta() {
    return this._zeta;
  }

  set zeta(value) {
    this._zeta = value === true;
  }

  get alpha() {
    return this._alpha;
  }

  set alpha(value) {
    this._alpha = value === true;
  }

  get beta() {
    return this._beta;
  }

  set beta(value) {
    this._beta = value === true;
  }

  get gamma() {
    return this._gamma;
  }

  set gamma(value) {
    this._gamma = value === true;
  }

  get greenOrGoldBooty() {
    return this._greenAndGoldBooty;
  }

  set greenOrGoldBooty(value) {
    this._greenAndGoldBooty = value === true;
  }

  get palladium() {
    return this._palladium;
  }

  set palladium(value) {
    this._palladium = value === true;
  }

  get bonusBox() {
    return this._bonusBox;
  }

  set bonusBox(value) {
    this._bonusBox = value === true;
  }

  get cargoBox() {
    return this._cargoBox;
  }

  set cargoBox(value) {
    this._cargoBox = value === true;
  }

  get material() {
    return this._material;
  }

  set material(value) {
    this._material = value === true;
  }

  get flee() {
    return this._runFromEnemy;
  }

  set flee(value) {
    this._runFromEnemy = value === true;
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