class BoxType {
  static get bonusBox() {
    return "BONUS_BOX";
  }

  static get miniPumpkin() {
    return "MINI_PUMPKIN";
  }

  static get pirateBootyGreen() {
    return "PIRATE_BOOTY";
  }

  static get pirateBootyRed() {
    return "PIRATE_BOOTY_RED";
  }

  static get pirateBootyBlue() {
    return "PIRATE_BOOTY_BLUE";
  }

  static get pirateBootyGold() {
    return "PIRATE_BOOTY_GOLD";
  }

  static get pirateBootyMasque() {
    return "MASQUE_BOOTY_BOX";
  }

  static get demanerBox() {
    return "DEMANER_INVADER_BOX";
  }

  static get yurisBox() {
    return "YURIS_BONUS_BOX";
  }

  static get giftBox() {
    return "GIFT_BOXES";
  }

  static get colors() {
    var ret = {};
    ret[BoxType.bonusBox] = "yellow";
    ret[BoxType.miniPumpkin] = "white";
    ret[BoxType.pirateBootyGreen] = "green";
    ret[BoxType.pirateBootyRed] = "red";
    ret[BoxType.pirateBootyBlue] = "blue";
    ret[BoxType.pirateBootyGold] = "gold";
    ret[BoxType.pirateBootyMasque] = "violet";
    ret[BoxType.demanerBox] = "blueviolet"
    ret[BoxType.giftBox] = "blue";
    ret[BoxType.yurisBox] = "blanchedalmond";

    return ret;
  }

  static getColor(boxType) {
    var color = BoxType.colors[boxType];
    if (color != null)
      return color;
    else
      return "lime";
  }
}