/*
Created by Freshek on 28.10.2017
*/

class AutolockWindow {
  createWindow() {
    this.autolockWindow = WindowFactory.createWindow({
      width: 300,
      text: "Autolocker"
    });

    let options = [{
        name: 'lockPlayers',
        labelText: 'Autolock Players (key: z)',
        appendTo: this.autolockWindow,
        event: function () {
          window.settings.lockPlayers = this.checked;
        }
      },
      {
        name: 'autoAttack',
        labelText: 'Auto attack Player after lock',
        appendTo: this.autolockWindow,
        event: function () {
          window.settings.autoAttack = this.checked;
        }
      },
      {
        name: 'lockNpc',
        labelText: 'Autolock NPCs (key: x)',
        appendTo: this.autolockWindow,
        event: function () {
          window.settings.lockNpc = this.checked;
        }
      },
      {
        name: 'excludeNpcs',
        labelText: 'Exclude NPCs from locking',
        appendTo: this.autolockWindow,
        event: function () {
          window.settings.excludeNpcs = this.checked;
        }
      },
      {
        name: 'autoAttackNpcs',
        labelText: 'Auto attack NPC after lock',
        appendTo: this.autolockWindow,
        event: function () {
          window.settings.autoAttackNpcs = this.checked;
        }
      },
    ];

    options.forEach((option) => {
      this[option.name] = ControlFactory.checkbox(option);
    });

  }
}