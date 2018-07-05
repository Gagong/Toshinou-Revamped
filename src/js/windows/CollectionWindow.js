/*
Created by Freshek on 14.10.2017
*/

class CollectionWindow {
  createWindow() {
    this.collectionWindow = WindowFactory.createWindow({
      width: 300,
      text: "Collection"
    });

    let controls = [{
        name: 'collectBoxes',
        labelText: 'Collect boxes',
        appendTo: this.collectionWindow,
        event: function () {
          window.settings.collectBoxes = this.checked;
        }
      },
      {
        name: 'collectEventBoxes',
        labelText: 'Collect event boxes',
        appendTo: this.collectionWindow,
        event: function () {
          window.settings.collectEventBoxes = this.checked;
        }
      },
      {
        name: 'collectMaterials',
        labelText: 'Collect materials',
        appendTo: this.collectionWindow,
        event: function () {
          window.settings.collectMaterials = this.checked;
        }
      },
      {
        name: 'collectCargo',
        labelText: 'Collect cargo',
        appendTo: this.collectionWindow,
        event: function () {
          window.settings.collectCargo = this.checked;
        }
      },
      {
        name: 'collectMayhem',
        labelText: 'Collect mayhem boxes',
        appendTo: this.collectionWindow,
        event: function () {
          window.settings.collectMayhem = this.checked;
        }
      },
      {
          name: 'collectGreenOrGoldBooty',
          labelText: 'Collect green or gold booty',
          appendTo: this.collectionWindow,
          event: function () {
            window.settings.collectGreenOrGoldBooty = this.checked;
          }
      },
      {
          name: 'collectBlueBooty',
          labelText: 'Collect blue booty',
          appendTo: this.collectionWindow,
          event: function () {
            window.settings.collectBlueBooty = this.checked;
          }
      },
      {
          name: 'collectRedBooty',
          labelText: 'Collect red booty',
          appendTo: this.collectionWindow,
          event: function () {
            window.settings.collectRedBooty = this.checked;
          }
      },
      {
          name: 'collectMasqueBooty',
          labelText: 'Collect masque booty',
          appendTo: this.collectionWindow,
          event: function () {
            window.settings.collectMasqueBooty = this.checked;
          }
      },
    ];

    controls.forEach((control) => {
      this[control.name] = ControlFactory.createControl(control);
    });
  }
}