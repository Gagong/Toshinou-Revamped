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
        name: 'cargobox',
        labelText: 'Cargo box',
        appendTo: this.boxSettingsWindow,
        event: function () {
          window.settings.cargobox = this.checked;
        }
      },
      {
        name: 'palladiumbox',
        labelText: 'Palladium',
        appendTo: this.boxSettingsWindow,
        event: function () {
          window.settings.palladiumbox = this.checked;
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
        name: 'booty',
        labelText: 'Booty keys SOON',
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
