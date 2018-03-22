/*
Created by Freshek on 13.10.2017
*/

class MathUtils {

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  static random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static percentFrom(val, val2) {
    return (val / val2) * 100;
  }
}
