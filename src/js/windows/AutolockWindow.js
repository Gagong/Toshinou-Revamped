class AutolockWindow {
  createWindow() {
    this.autolockWindow = WindowFactory.createWindow({
      width: 320,
      text: "Autolocker"
    });

    let options = [{
        name: 'lockNpcs',
        labelText: 'Autolock NPCs (key: x)',
        appendTo: this.autolockWindow,
        event: function () {
          window.settings.lockNpcs = this.checked;
        }
      },
      {
        name: 'lockPlayers',
        labelText: 'Autolock Players (key: z)',
        appendTo: this.autolockWindow,
        event: function () {
          window.settings.lockPlayers = this.checked;
        }
      },
      {
        name: 'autoAttack',
        labelText: 'Attack locked target',
        appendTo: this.autolockWindow,
        event: function () {
          window.settings.autoAttack = this.checked;
        }
      },
    ];

    options.forEach((option) => {
      this[option.name] = ControlFactory.checkbox(option);
    });

  }
}