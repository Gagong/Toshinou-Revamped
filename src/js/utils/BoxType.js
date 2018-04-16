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

  static get pirateBootyBlack() {
    return "BLACK_BOOTY_BOX";
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

  static get aurusBox() {
    return "AURUS_BOX";
  }

  static get bifenonBox() {
    return "BIFENON";
  }

  static get hybridAlloyBox() {
    return "HYBRID_ALLOY_BOX";
  }

  static get colors() {
    let ret = {};
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
    ret[BoxType.pirateBootyBlack] = "darkgray";
    ret[BoxType.aurusBox] = "deepskyblue";
    ret[BoxType.bifenonBox] = "darkblue";
    ret[BoxType.hybridAlloyBox] = "blueviolet";

    return ret;
  }

  static getColor(boxType) {
    let color = BoxType.colors[boxType];
    if (color != null)
      return color;
    else
      return "lime";
  }
}