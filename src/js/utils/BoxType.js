/*
Created by Freshek on 28.10.2017
*/

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
    ret[BoxType.giftBox] = "blue";

    return ret;
  }

  static getColor(boxType) {
    var color = BoxType.colors[boxType];
    if (color != null)
      return color;
    else
      return "green";
  }
}