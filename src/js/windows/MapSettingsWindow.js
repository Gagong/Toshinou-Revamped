class MapSettingsWindow{
  createWindow() {
    this.MapSettingsWindow = WindowFactory.createWindow({
      width: 320,
      maxHeight: 300,
      text: "Travel System"
    });
    
    let controls = [{
        name: '1-1',
        labelText: '1-1',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=1;
          }
        }
      },
      {
        name: '1-2',
        labelText: '1-2',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=2;
          }
        }
      },
      {
        name: '1-3',
        labelText: '1-3',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=3;
          }
        }
      },
      {
        name: '1-4',
        labelText: '1-4',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=4;
          }
        }
      },
      {
        name: '4-1',
        labelText: '4-1',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=13;
          }
        }
      },
      {
        name: '4-2',
        labelText: '4-2',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=14;
          }
        }
      },
      {
        name: '4-3',
        labelText: '4-3',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=15;
          }
        }
      },
	  {
        name: '2-1',
        labelText: '2-1',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=5;
          }
        }
      },
	  {
        name: '2-2',
        labelText: '2-2',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=6;
          }
        }
      },
	  {
        name: '2-3',
        labelText: '2-3',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=7;
          }
        }
      },
	  {
        name: '2-4',
        labelText: '2-4',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=8;
          }
        }
      },
	  {
        name: '3-1',
        labelText: '3-1',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=9;
          }
        }
      },
	  {
        name: '3-2',
        labelText: '3-2',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=10;
          }
        }
      },
	  {
        name: '3-3',
        labelText: '3-3',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=11;
          }
        }
      },
	  {
        name: '3-4',
        labelText: '3-4',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=12;
          }
        }
      },
	  {
        name: '4-4',
        labelText: '4-4',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=16;
          }
        }
      },
	  {
        name: '4-5',
        labelText: '4-5',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=29;
          }
        }
      },
	  {
        name: '1-5',
        labelText: '1-5',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=17;
          }
        }
      },
	  {
        name: '1-6',
        labelText: '1-6',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=18;
          }
        }
      },
	  {
        name: '1-7',
        labelText: '1-7',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=19;
          }
        }
      },
	  {
        name: '1-7',
        labelText: '1-7',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=20;
          }
        }
      },
	  {
        name: '2-5',
        labelText: '2-5',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=21;
          }
        }
      },
	  {
        name: '2-6',
        labelText: '2-6',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=22;
          }
        }
      },
	  {
        name: '2-7',
        labelText: '2-7',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=23;
          }
        }
      },
	  {
        name: '2-8',
        labelText: '2-8',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=24;
          }
        }
      },
	  {
        name: '3-5',
        labelText: '3-5',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=25;
          }
        }
      },
	  {
        name: '3-6',
        labelText: '3-6',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=26;
          }
        }
      },
	  {
        name: '3-7',
        labelText: '3-7',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=27;
          }
        }
      },
	  {
        name: '3-8',
        labelText: '3-8',
        appendTo: this.MapSettingsWindow,
        event: function () {
          if(this.checked){
            window.settings.workmap=28;
          }
        }
      },
     ]
    

    controls.forEach((control) => {
      this[control.name] = ControlFactory.createControl(control);
    });
    
  }
}