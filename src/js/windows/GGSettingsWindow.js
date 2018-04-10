class GGSettingsWindow {
  createWindow() {
    this.GGSettingsWindow = WindowFactory.createWindow({width: 320, text: "GG Helper"});

    let controls = [
      {
        name: 'alpha',
        labelText: 'Move to GG Alpha',
        appendTo: this.GGSettingsWindow,
        event: function() {
          window.settings.alpha = this.checked;
        }
      },
      {
        name: 'beta',
        labelText: 'Move to GG Beta',
        appendTo: this.GGSettingsWindow,
        event: function() {
          window.settings.beta = this.checked;
        }
      },
      {
        name: 'gamma',
        labelText: 'Move to GG Gamma',
        appendTo: this.GGSettingsWindow,
        event: function() {
          window.settings.gamma = this.checked;
        }
      },
      {
        name: 'zeta',
        labelText: 'Move to GG Zeta<br>I am use this helper with Clickermann to jump in to the next GG wave.<br>Sorry, i am have not other GGs ATM.<br>If you have other GGs and wanna help me - PM me.',
        appendTo: this.GGSettingsWindow,
        event: function() {
          window.settings.zeta = this.checked;
        }
      }
    ]

    controls.forEach((control)=>{
      this[control.name] = ControlFactory.createControl(control);
    });
  }
}
