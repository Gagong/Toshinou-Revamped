class BoxSettingsWindow {
  createWindow() {
    this.boxSettingsWindow = WindowFactory.createWindow({width: 320, text: "Box settings"});

    let controls = [
      {
        name: 'bonusbox',
        labelText: 'Bonus box',
        appendTo: this.boxSettingsWindow,
        event: function () {
          window.settings.bonusbox = this.checked;
        }
      },
      {
        name: 'matherials',
        labelText: 'Matherials',
        appendTo: this.boxSettingsWindow,
        event: function () {
          window.settings.matherials = this.checked;
        }
      },
      {
        name: 'cargobox',
        labelText: 'Cargo box (Disabled ATM)',
        appendTo: this.boxSettingsWindow,
        event: function () {
          window.settings.cargobox = this.checked;
        }
      },
      {
        name: 'booty',
        labelText: 'Green | Gold booty boxes',
        appendTo: this.boxSettingsWindow,
        event: function () {
          window.settings.booty = this.checked;
        }
      }
    ]

    controls.forEach((control)=>{
      this[control.name] = ControlFactory.createControl(control);
    });
  }
}
