class GGSettingsWindow {
  createWindow() {
    this.GGSettingsWindow = WindowFactory.createWindow({
      width: 320,
      text: "GG Helper"
    });

    let controls = [{
        name: 'alpha',
        labelText: 'Move to GG Alpha',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.alpha = this.checked;
        }
      },
      {
        name: 'beta',
        labelText: 'Move to GG Beta',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.beta = this.checked;
        }
      },
      {
        name: 'gamma',
        labelText: 'Move to GG Gamma',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.gamma = this.checked;
        }
      },
      {
        name: 'delta',
        labelText: 'Move to GG Delta',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.delta = this.checked;
        }
      },
      {
        name: 'zeta',
        labelText: "Move to GG Zeta",
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.zeta = this.checked;
        }
      },
      {
        name: 'kappa',
        labelText: 'Move to GG Kappa',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.kappa = this.checked;
        }
      },
    ]

    let info = [{
      name: 'info',
      labelText: "<----------------INFO----------------><br>I'm using this helper with Clickermann to jump to the next GG wave.<br>Sorry, but I don't have other GG's atm.<br>If you have other GG's feel free to contact me, your help will be apreciated.",
      spanText: '',
      appendTo: this.GGSettingsWindow
    }]

    controls.forEach((control) => {
      this[control.name] = ControlFactory.createControl(control);
    });

    info.forEach((infos) => {
      this[infos.name] = ControlFactory.info(infos);
    });
  }
}