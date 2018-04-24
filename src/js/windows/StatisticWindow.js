class StatisticWindow {

  createWindow() {
    this.botStatisticWindow = WindowFactory.createWindow({
      width: 320,
      text: "Statistic"
    });
    this.connected = false;

    let defaultStat = {
      startTime: new Date(),
      credits: 0,
      uridium: 0,
      energy: 0,
      ammo: 0,
      experience: 0,
      honor: 0,
      rank: 0,
      speed: 0,
    };

    this.stats = Object.assign({}, defaultStat);

    let options = [{
        name: 'startTime',
        labelText: 'Start at: ',
        spanText: this.stats.startTime.toLocaleString(navigator.languages[0]),
        appendTo: this.botStatisticWindow
      },
      {
        name: 'credits',
        labelText: 'Credits: ',
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'uridium',
        labelText: 'Uridium: ',
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'energy',
        labelText: 'GG Energy: ',
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'ammo',
        labelText: 'Ammo: ',
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'experience',
        labelText: 'Experience: ',
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'honor',
        labelText: 'Honor: ',
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'rank',
        labelText: 'Rank Points: ',
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'speed',
        labelText: 'Speed: ',
        spanText: '0.00 uri/min.',
        appendTo: this.botStatisticWindow
      }
    ];

    if (window.globalSettings.showRuntime) {
      options.push({
        name: 'runtime',
        labelText: 'Runtime: ',
        spanText: '00:00:00',
        appendTo: this.botStatisticWindow
      });
    }

    options.forEach((option) => {
      this[option.name] = ControlFactory.info(option);
    });

    this.resetBtn = ControlFactory.btn({
      labelText: 'Reset',
      appendTo: ControlFactory.emptyDiv(this.botStatisticWindow)
    });

    let standardListeners = [{
        event: 'addCredits',
        el: 'credits',
        detailEl: 'credits'
      },
      {
        event: 'addUridium',
        el: 'uridium',
        detailEl: 'uridium'
      },
      {
        event: 'addGgEnergy',
        el: 'energy',
        detailEl: 'energy'
      },
      {
        event: 'addAmmo',
        el: 'ammo',
        detailEl: 'ammo'
      },
      {
        event: 'addExperience',
        el: 'experience',
        detailEl: 'experience'
      },
      {
        event: 'addHonor',
        el: 'honor',
        detailEl: 'honor'
      },
    ];

    standardListeners.forEach((item) => {
      this.setStandardEventListener(item);
    });

    $(this.resetBtn).on('click', (ev) => {
      ev.preventDefault(ev);

      this.stats = Object.assign({}, defaultStat);
      this.stats.startTime = new Date();

      Object.keys(this.stats).forEach((item) => {
        let el = $('span:last-child', this[item]);

        if ('startTime' == item) {
          el.html(this.stats[item].toLocaleString(navigator.languages[0]));
        } else {
          el.html(this.stats[item]);
        }
      });
    });

    $(window).on('connection', (e) => {
      this.connected = e.detail.connected;
    });

    $(window).on('logicEnd', () => {
      if (this.connected) {

        if (window.globalSettings.showRuntime) {
          $('span:last-child', this.runtime).text(TimeHelper.diff(this.stats.startTime));
        }

        $('span:last-child', this.speed).text(this.speedFormat(this.stats.uridium, this.stats.startTime));
      }
    });
  }

  speedFormat(uri, startTime) {

    let timeMinutes = TimeHelper.totalMinutes(startTime);
    let curFormat = window.globalSettings.speedFormat;

    let formats = {
      min: (uri / timeMinutes).toFixed(2),
      hour: ((uri / timeMinutes) * 60).toFixed(2),
    };

    let result = uri > 0 & timeMinutes > 0 ? formats[curFormat] : '0.00';
    result += `  uri/${curFormat}`;

    return result;
  }

  setStandardEventListener({
    event,
    el,
    detailEl
  }) {
    let htmlEl = this[el];
    $(window).on(event, (e) => {
      let el = $('span:last-child', htmlEl);
      if (detailEl == "experience") {
        this.stats.rank += parseInt(e.detail[detailEl]) / 10000;
        this.rank.text("Rank Points: " + Math.floor(this.stats.rank));
      } else if (detailEl == "honor") {
        this.stats.rank += parseInt(e.detail[detailEl]) / 100;
        this.rank.text("Rank Points: " + Math.floor(this.stats.rank));
      }
      this.stats[detailEl] += parseInt(e.detail[detailEl]);
      let collected = this.stats[detailEl];
      el.text(collected);
    });
  }
}