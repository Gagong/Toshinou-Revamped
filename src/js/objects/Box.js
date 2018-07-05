/*
Created by Freshek on 07.10.2017
*/

class Box extends Movable {
  constructor(x, y, hash, type) {
    super(x, y);
    this.hash = hash;
    this.type = type;
  }

  toString() {
    return JSON.parse(this);
  }

  isMaterial() {
    var type = this.type.toLowerCase();
    return (type == "mucosum" || type == "prismatium" || type == "scrapium" || type == "boltrum" || type == "aurus_box");
  }

  isCollectable() {
    var type = this.type;
    return (type == "BONUS_BOX");
  }

  isEventBox() {
    var type = this.type;
    return (type == "USA_FLAG");
  }

  isMayhem() {
    var type = this.type;
    return (type == "MAYHEM_BOX");
  }

  isCargo() {
    var type = this.type;
    return (type == "FROM_SHIP");
  }

  isGreenOrGoldBooty() {
    let type = this.type;
    return (type == "PIRATE_BOOTY" || type == "PIRATE_BOOTY_GOLD");
  }

  isBlueBooty() {
    let type = this.type;
    return (type == "PIRATE_BOOTY_BLUE");
  }

  isRedBooty() {
    let type = this.type;
    return (type == "PIRATE_BOOTY_RED");
  }

  isMasqueBooty() {
    let type = this.type;
    return (type == "MASQUE_BOOTY_BOX");
  }

  get isBooty() {
    let type = this.type;
    if (type == "PIRATE_BOOTY" || type == "PIRATE_BOOTY_GOLD" || type == "PIRATE_BOOTY_BLUE" || type == "PIRATE_BOOTY_RED" || type == "MASQUE_BOOTY_BOX") {
      return true;
    } else { 
      return false; 
    }
  }
}
