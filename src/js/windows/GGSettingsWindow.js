class GGSettingsWindow {
  createWindow() {
    this.GGSettingsWindow = WindowFactory.createWindow({
      width: 320,
      text: "GG Helper"
    });

    let controls = [{
        name: 'alpha',
        labelText: 'Jump in GG Alpha',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.alpha = this.checked;
        }
      },
      {
        name: 'beta',
        labelText: 'Jump in GG Beta',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.beta = this.checked;
        }
      },
      {
        name: 'gamma',
        labelText: 'Jump in GG Gamma',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.gamma = this.checked;
        }
      },
      {
        name: 'delta',
        labelText: 'Jump in GG Delta',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.delta = this.checked;
        }
      },
      {
        name: 'epsilon',
        labelText: 'Jump in GG Epsilon',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.epsilon = this.checked;
        }
      },
      {
        name: 'zeta',
        labelText: 'Jump in GG Zeta',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.zeta = this.checked;
        }
      },
      {
        name: 'kappa',
        labelText: 'Jump in GG Kappa',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.kappa = this.checked;
        }
      },
      {
        name: 'lambda',
        labelText: 'Jump in GG Lambda',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.lambda = this.checked;
        }
      },
      {
        name: 'kronos',
        labelText: 'Jump in GG Kronos',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.kronos = this.checked;
        }
      },
      {
        name: 'hades',
        labelText: 'Jump in GG Hades',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.hades = this.checked;
        }
      },
      {
        name: 'kuiper',
        labelText: 'Jump in GG Kuiper',
        appendTo: this.GGSettingsWindow,
        event: function () {
          window.settings.kuiper = this.checked;
        }
      }
    ]

    controls.forEach((control) => {
      this[control.name] = ControlFactory.createControl(control);
    });
  }
}