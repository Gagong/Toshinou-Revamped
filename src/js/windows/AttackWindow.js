class AttackWindow {
  createWindow() {
    this.attackWindow = WindowFactory.createWindow({
      width: 320,
      text: "Attack Details"
    });

    this.targetNameTxt = jQuery("<h4>");
    this.targetNameTxt.text("Target: -");

    this.hpTxt = jQuery("<h4>");
    this.hpTxt.text("HP: -");

    this.shdTxt = jQuery("<h4>");
    this.shdTxt.text("SHD: -");

    this.targetNameTxt.appendTo(this.attackWindow);
    this.hpTxt.appendTo(this.attackWindow);
    this.shdTxt.appendTo(this.attackWindow);
  }

  removeTarget() {
    this.targetName.text("Target: -");
    this.hpTxt.text("HP: -");
    this.shdTxt.text("SHD: -");
  }

  targetName(value) {
    this.targetNameTxt.text("Target: " + value);
  }

  hp(value) {
    this.hpTxt.text("HP: " + value);
  }

  shd(value) {
    this.shdTxt.text("SHD: " + value);
  }
}