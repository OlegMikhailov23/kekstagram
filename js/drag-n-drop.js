'use strict';

(function () {

  var Coordinate = function (x) {
    this._x = x;
  }

  Coordinate.prototype.setX = function (x) {
    this._x = x;
  };

  window.dragAndDrop = function (evt, cb1, cb2, el) {

    evt.preventDefault();

    var startCoordinate = new Coordinate();
    startCoordinate.setX(evt.clientX);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = new Coordinate();
      shift.setX(startCoordinate._x - moveEvt.clientX);

      startCoordinate.setX(moveEvt.clientX);
      console.log(startCoordinate);

      var position = el.offsetLeft - shift._x;
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
