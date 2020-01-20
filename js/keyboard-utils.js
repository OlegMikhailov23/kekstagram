'use strict';

window.keyboardUtils = (function() {

  var ESC_KEYCODE = 27;

  var ENTER_KEYCODE = 13;

  var PLUS_KEYCODE = 187;

  var MINUS_KEYCODE = 189;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    isPlusEvent: function (evt, action) {
      if (evt.keyCode === PLUS_KEYCODE) {
        action();
      }
    },
    isPlusEvent: function (evt, action) {
      if (evt.keyCode === MINUS_KEYCODE) {
        action();
      }
    }
  };
})();
