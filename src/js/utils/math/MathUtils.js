 class MathUtils {
  static random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static percentFrom(val, val2) {
    return (val / val2) * 100;
  }
}