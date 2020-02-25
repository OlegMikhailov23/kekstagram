'use strict';

(function () {
  window.mathUtils = {
    getRandomNumber: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = array[i];
        array[i] = array[j];
        array[j] = t;
      }
      return array;
    }
  };
})();
