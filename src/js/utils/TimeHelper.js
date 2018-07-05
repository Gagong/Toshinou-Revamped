class TimeHelper {

  static diff(time) {
    let ms_diff = new Date().getTime() - time.getTime();
    let diff = {};

    diff.days = Math.floor(ms_diff / 1000 / 60 / 60 / 24);
    ms_diff -= diff.days * 1000 * 60 * 60 * 24;

    diff.hours = Math.floor(ms_diff / 1000 / 60 / 60);
    ms_diff -= diff.hours * 1000 * 60 * 60;

    diff.minutes = Math.floor(ms_diff / 1000 / 60);
    ms_diff -= diff.minutes * 1000 * 60;

    diff.seconds = Math.floor(ms_diff / 1000);

    let days = diff.days ? `${diff.days} d. ` : '';

    let result = [
      diff.hours.toString().length == 1 ? `0${diff.hours}` : diff.hours,
      diff.minutes.toString().length == 1 ? `0${diff.minutes}` : diff.minutes,
      diff.seconds.toString().length == 1 ? `0${diff.seconds}` : diff.seconds,
    ];

    return days + result.join(':');
  }

  static totalMinutes(time) {
    let ms_diff = new Date().getTime() - time.getTime();
    return Math.floor(ms_diff / 1000 / 60);
  }

}