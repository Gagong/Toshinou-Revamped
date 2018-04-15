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
        name: 'zeta',
        labelText: "Move to GG Zeta<br>I'm using this helper with Clickermann to jump to the next GG wave.<br>Sorry, but I don't have other GG's atm.<br>If you have other GG's feel free to contact me, your help will be apreciated.",
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.zeta = this.checked;
        }
      }
    ]

    controls.forEach((control) => {
      this[control.name] = ControlFactory.createControl(control);
    });
  }
}