class BoxSettingsWindow {
  createWindow() {
    this.boxSettingsWindow = WindowFactory.createWindow({
      width: 320,
      text: "Box settings"
    });

    let controls = [{
        name: 'bonusBox',
        labelText: 'Bonus box',
        appendTo: this.boxSettingsWindow,
        event: function () {
          window.settings.bonusBox = this.checked;
        }
      },
      {
        name: 'materials',
        labelText: 'Materials',
        appendTo: this.boxSettingsWindow,
        event: function () {
          window.settings.materials = this.checked;
        }
      },
      {
        name: 'cargoBox',
        labelText: 'Cargo box',
        appendTo: this.boxSettingsWindow,
        event: function () {
          window.settings.cargoBox = this.checked;
        }
      },
      {
        name: 'greenOrGoldBooty',
        labelText: 'Green | Gold booty boxes',
        appendTo: this.boxSettingsWindow,
        event: function () {
          window.settings.greenOrGoldBooty = this.checked;
        }
      },
      {
        name: 'redBooty',
        labelText: 'Red booty boxes',
        appendTo: this.boxSettingsWindow,
        event: function () {
          window.settings.redBooty = this.checked;
        }
      },
      {
        name: 'blueBooty',
        labelText: 'Blue booty boxes',
        appendTo: this.boxSettingsWindow,
        event: function () {
          window.settings.blueBooty = this.checked;
        }
      },
      {
        name: 'masqueBooty',
        labelText: 'Apocalyptic booty boxes',
        appendTo: this.boxSettingsWindow,
        event: function () {
          window.settings.masqueBooty = this.checked;
        }
      }
    ]

    controls.forEach((control) => {
      this[control.name] = ControlFactory.createControl(control);
    });
  }
}