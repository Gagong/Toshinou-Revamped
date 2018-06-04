class Box extends Movable {
  constructor(x, y, hash, type) {
    super(x, y);
    this.hash = hash;
    this.type = type;
  }

  toString() {
    return JSON.parse(this);
  }

  isResource() {
    let type = this.type;
    return (type == "0" || type == "1" || type == "2"); //Prometium - 0 | Endurium - 1 | Terbium - 2
  }

  isPalladium() {
    let type = this.type;
    return (type == "8"); // Palladium - 8
  }

  isGreenOrGoldBooty() {
    let type = this.type;
    return (type == "PIRATE_BOOTY" || type == "PIRATE_BOOTY_GOLD");
  }

  isMasqueBooty() {
    let type = this.type;
    return (type == "MASQUE_BOOTY_BOX");
  }

  isBlueBooty() {
    let type = this.type;
    return (type == "PIRATE_BOOTY_BLUE");
  }

  isRedBooty() {
    let type = this.type;
    return (type == "PIRATE_BOOTY_RED");
  }

  isCargoBox() {
    let type = this.type;
    return (type == "FROM_SHIP");
  }

  isDropRes() {
    let type = this.type;
    return (type == "AURUS_BOX" || type == "BIFENON" || type == "HYBRID_ALLOY_BOX" || type == "DEMANER_INVADER_BOX");
  }

  isCollectable() {
    let type = this.type;
    return (type == "BONUS_BOX" || type == "MINI_PUMPKIN" || type == "TURKISH_FLAG" || type == "GIFT_BOXES" || type == "ICY_BOX" || type == "YURIS_BONUS_BOX" || type == "ID_MEXICO");
  }

  isMaterial() {
    let type = this.type;
    return (type == "MUCOSUM" || type == "PRISMATIUM" || type == "SCRAPIUM" || type == "BOLTRUM");
  }
}