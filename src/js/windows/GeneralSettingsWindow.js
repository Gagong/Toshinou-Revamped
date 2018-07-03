class GeneralSettingsWindow {
  createWindow() {
    this.botSettingsWindow = WindowFactory.createWindow({
      width: 320,
      text: "General"
    });

    let controls = [
      {
        name: 'palladium',
        labelText: 'Palladium Bot',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.palladium = this.checked;
        }
      },
      {
        name: 'travelsystem',
        labelText: 'Travel System',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.travelsystem = this.checked;
        }
      },
      {
        name: 'moveRandomly',
        labelText: 'Move randomly',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.moveRandomly = this.checked;
        }
      },
      {
        name: 'npcKiller',
        labelText: 'Kill NPCs',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.killNpcs = this.checked;
        }
      },
      {
        name: 'fleeFromEnemy',
        labelText: 'Flee from enemy',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.fleeFromEnemy = this.checked;
        }
      },
      {
        name: 'jumpFromEnemy',
        labelText: 'Jump And Return',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.jumpFromEnemy = this.checked;
        }
      },
      {
        name: 'dodgeTheCbs',
        labelText: 'Dodge the CBS',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.dodgeTheCbs = this.checked;
        }
      },
      {
        name: 'avoidAttackedNpcs',
        labelText: 'Avoid attacked NPCs<br>(Dont use with PET)',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.avoidAttackedNpcs = this.checked;
        }
      },
      {
        name: 'npcCircle',
        labelText: 'Circle',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.circleNpc = this.checked;
        }
      },
      {
        name: 'npcCircleRadius',
        labelText: 'Circle radius <span> (500px)</span>',
        type: 'range',
        appendTo: this.botSettingsWindow,
        labelBefore: true,
        attrs: {
          min: 1,
          max: 800,
          step: 1,
          value: 500,
        },
        event: function (ev) {
          window.settings.npcCircleRadius = this.value;
          $('span:last-child', this.label).text(' (' + this.value + 'px)');
        }
      },
      {
        name: 'dontCircleWhenHpBelow25Percent',
        labelText: "Don't circle when HP < 25%",
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.dontCircleWhenHpBelow25Percent = this.checked;
        }
      },
      {
        name: 'resetTargetWhenHpBelow25Percent',
        labelText: "Reset Target when HP < 25%",
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.resetTargetWhenHpBelow25Percent = this.checked;
        }
      },
      {
        name: 'repairWhenHpIsLowerThanPercent',
        labelText: ' Repair when HP < <span> (10%)</span>',
        type: 'range',
        appendTo: this.botSettingsWindow,
        labelBefore: true,
        attrs: {
          min: 0,
          max: 100,
          step: 1,
          value: 10,
        },
        event: function (ev) {
          window.settings.repairWhenHpIsLowerThanPercent = this.value;
          $('span:last-child', this.label).text(' (' + this.value + '%)');
        }
      },
      {
        name: 'reviveAtGate',
        labelText: 'Revive at the nearest gate',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.reviveAtGate = this.checked;
        }
      },
      {
        name: 'reviveAtSpot',
        labelText: 'Revive at spot',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.reviveAtSpot = this.checked;
        }
      },
      {
        name: 'reviveAtBase',
        labelText: 'Revive at base',
        appendTo: this.botSettingsWindow,
        event: function () {
          window.settings.reviveAtBase = this.checked;
        }
      },
      {
        name: 'reviveLimit',
        labelText: 'Revive limit <span> (5)</span>',
        type: 'range',
        appendTo: this.botSettingsWindow,
        labelBefore: true,
        attrs: {
          min: 0,
          max: 100,
          step: 1,
          value: 10
        },
        event: function () {
          window.settings.reviveLimit = this.value;
          $('span:last-child', this.label).text(' (' + this.value + ')');
        }
      }
    ];

    controls.forEach((control) => {
      this[control.name] = ControlFactory.createControl(control);
    });

    if (window.globalSettings.enableRefresh) {
      let saveButton = jQuery('<div class="saveButton"><button class="btn_save save btn">Save settings & Enable refresh</button></div>');
    this.botSettingsWindow.append(saveButton);
    }
  }
}