'use strict';

(function () {
  window.dragAndDrop = function (evt, cb1, cb2, el) {

    evt.preventDefault();

    var startCoordinate = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoordinate.x - moveEvt.clientX
      };
      startCoordinate = {
        x: moveEvt.clientX
      };
      var position = el.offsetLeft - shift.x;
      cb1(position);
      cb2(position);
    };

    var onScaleMouseup = function () {
      evt.preventDefault();
      document.removeEventListener('mouseup', onScaleMouseup);
      document.removeEventListener('mousemove', onMouseMove);
    };
    document.addEventListener('mouseup', onScaleMouseup);
    document.addEventListener('mousemove', onMouseMove);
  };
})();
