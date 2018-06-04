class Settings {
  constructor(pause, 
    palladium, refresh, moveRandomly, killNpcs, fleeFromEnemy, avoidAttackedNpcs, circleNpc, dontCircleWhenHpBelow25Percent, reviveAtGate,

    bonusBox, materials, cargoBox, greenOrGoldBooty, redBooty, blueBooty, masqueBooty,

    alpha, beta, gamma, delta, epsilon, zeta, kappa, lambda, kronos, hades, kuiper,

    lockNpcs, lockPlayers, autoAttack) 
  {
    this._pause = pause === true;

    this._palladium = palladium === true;
    this._refresh = refresh === true;
    this._moveRandomly = moveRandomly === true;
    this._killNpcs = killNpcs === true;    
    this._fleeFromEnemy = fleeFromEnemy === true;
    this._avoidAttackedNpcs = avoidAttackedNpcs === true;
    this._circleNpc = circleNpc === true;
    this.npcCircleRadius = 500;
    this._dontCircleWhenHpBelow25Percent = dontCircleWhenHpBelow25Percent === true;
    this._reviveAtGate = reviveAtGate === true;
    this.reviveLimit = 5;

    this._bonusBox = bonusBox === true;
    this._materials = materials === true;
    this._cargoBox = cargoBox === true;
    this._greenOrGoldBooty = greenOrGoldBooty === true;
    this._redBooty = redBooty === true;
    this._blueBooty = blueBooty === true;
    this._masqueBooty = masqueBooty === true;

    this._alpha = alpha === true;
    this._beta = beta === true;
    this._gamma = gamma === true;
    this._delta = delta === true;
    this._epsilon = epsilon === true;
    this._zeta = zeta === true;
    this._kappa = kappa === true;
    this._lambda = lambda === true;
    this._kronos = kronos === true;
    this._hades = hades === true;
    this._kuiper = kuiper === true;

    this._lockNpcs = lockNpcs === true;
    this._lockPlayers = lockPlayers === true;
    this._autoAttack = autoAttack === true;

    this._npcs = [];
  }

  get pause() {
    return this._pause;
  }

  set pause(value) {
    this._pause = value === true;
  }

  get palladium() {
    return this._palladium;
  }

  set palladium(value) {
    this._palladium = value === true;
  }

  get refresh() {
    return this._refresh;
  }

  set refresh(value) {
    this._refresh = value === true;
  }

  get moveRandomly() {
    return this._moveRandomly;
  }

  set moveRandomly(value) {
    this._moveRandomly = value === true;
  }

  get killNpcs() {
    return this._killNpcs;
  }

  set killNpcs(value) {
    this._killNpcs = value === true;
  }

  get fleeFromEnemy() {
    return this._fleeFromEnemy;
  }

  set fleeFromEnemy(value) {
    this._fleeFromEnemy = value === true;
  }

  get avoidAttackedNpcs() {
    return this._avoidAttackedNpcs;
  }

  set avoidAttackedNpcs(value) {
    this._avoidAttackedNpcs = value === true;
  }

  get circleNpc() {
    return this._circleNpc;
  }

  set circleNpc(value) {
    this._circleNpc = value === true;
  }

  get dontCircleWhenHpBelow25Percent() {
    return this._dontCircleWhenHpBelow25Percent;
  }

  set dontCircleWhenHpBelow25Percent(value) {
    this._dontCircleWhenHpBelow25Percent = value === true;
  }

  get reviveAtGate() {
    return this._reviveAtGate;
  }

  set reviveAtGate(value) {
    this._reviveAtGate = value === true;
  }

  get bonusBox() {
    return this._bonusBox;
  }

  set bonusBox(value) {
    this._bonusBox = value === true;
  }

  get materials() {
    return this._materials;
  }

  set materials(value) {
    this._materials = value === true;
  }

  get cargoBox() {
    return this._cargoBox;
  }

  set cargoBox(value) {
    this._cargoBox = value === true;
  }

  get greenOrGoldBooty() {
    return this._greenOrGoldBooty;
  }

  set greenOrGoldBooty(value) {
    this._greenOrGoldBooty = value === true;
  }

  get redBooty() {
    return this._redBooty;
  }

  set redBooty(value) {
    this._redBooty = value === true;
  }

  get blueBooty() {
    return this._blueBooty;
  }

  set blueBooty(value) {
    this._blueBooty = value === true;
  }

  get masqueBooty() {
    return this._masqueBooty;
  }

  set masqueBooty(value) {
    this._masqueBooty = value === true;
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

  get delta() {
    return this._delta;
  }

  set delta(value) {
    this._delta = value === true;
  }

  get epsilon() {
    return this._epsilon;
  }

  set epsilon(value) {
    this._epsilon = value === true;
  }

  get zeta() {
    return this._zeta;
  }

  set zeta(value) {
    this._zeta = value === true;
  }

  get kappa() {
    return this._kappa;
  }

  set kappa(value) {
    this._kappa = value === true;
  }

  get lambda() {
    return this._lambda;
  }

  set lambda(value) {
    this._lambda = value === true;
  }

  get kronos() {
    return this._kronos;
  }

  set kronos(value) {
    this._kronos = value === true;
  }

  get hades() {
    return this._hades;
  }

  set hades(value) {
    this._hades = value === true;
  }

  get kuiper() {
    return this._kuiper;
  }

  set kuiper(value) {
    this._kuiper = value === true;
  }

  get lockNpcs() {
    return this._lockNpcs;
  }

  set lockNpcs(value) {
    this._lockNpcs = value === true;
  }

  get lockPlayers() {
    return this._lockPlayers;
  }

  set lockPlayers(value) {
    this._lockPlayers = value === true;
  }

  get autoAttack() {
    return this._autoAttack;
  }

  set autoAttack(value) {
    this._autoAttack = value === true;
  }

  setNpc(name, val) {
    this._npcs[name] = val;
  }

  getNpc(name) {
    return !this._npcs[name];
  }

}