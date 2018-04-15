class Box extends Movable {
  constructor(x, y, hash, type) {
    super(x, y);
    this.hash = hash;
    this.type = type;
    /*console.log(this);*/
  }

  toString() {
    return JSON.parse(this);
  }

  isResourse() {
    var type = this.type;
    return (type == "0" || type == "1" || type == "2"); //Prometium - 0 | Endurium - 1 | Terbium - 2
  }

  isPalladium() {
    var type = this.type;
    return (type == "8"); // Palladium - 8
  }

  isBooty() {
    var type = this.type;
    return (type == "PIRATE_BOOTY" || type == "PIRATE_BOOTY_GOLD");
  }

  isMSQBooty() {
    var type = this.type;
    return (type == "MASQUE_BOOTY_BOX");
  }

  isBBooty() {
    var type = this.type;
    return (type == "PIRATE_BOOTY_BLUE");
  }

  isRBooty() {
    var type = this.type;
    return (type == "PIRATE_BOOTY_RED");
  }

  isCargo() {
    var type = this.type;
    return (type == "FROM_SHIP");
  }

  isDropRes() {
    var type = this.type;
    return (type == "AURUS_BOX" || type == "BIFENON" || type == "HYBRID_ALLOY_BOX" || type == "DEMANER_INVADER_BOX");
  }

  isCollectable() {
    var type = this.type;
    return (type == "BONUS_BOX" || type == "MINI_PUMPKIN" || type == "TURKISH_FLAG" || type == "GIFT_BOXES" || type == "ICY_BOX" || type == "YURIS_BONUS_BOX");
  }

  isMaterial() {
    var type = this.type;
    return (type == "MUCOSUM" || type == "PRISMATIUM" || type == "SCRAPIUM" || type == "BOLTRUM");
  }
}