/*
Created by Freshek on 07.10.2017
*/

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

  isMaterial() {
    var type = this.type.toLowerCase();
    return (type == "mucosum" || type == "prismatium" || type == "scrapium" || type == "boltrum");
  }

  isCollectable() {
    var type = this.type;
    return (type == "BONUS_BOX" || type == "MINI_PUMPKIN" || type == "TURKISH_FLAG" || type == "GIFT_BOXES" || type == "ICY_BOX" || type == "HYBRID_ALLOY_BOX" || type == "AURUS_BOX" || type == "BIFENON" || type == "8"/* || type == "FROM_SHIP" || "PIRATE_BOOTY"*/);
  }
}
