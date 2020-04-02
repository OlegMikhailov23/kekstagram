'use strict';

(function () {

  var resizeMinus = document.querySelector('.resize__control--minus');

  var resizePlus = document.querySelector('.resize__control--plus');

  var resizeVal = window.uploadFormData.resizeVal;

  var previewPicture = window.uploadFormData.previewPicture;

  window.manageScale = {
    changeScale: function () {
      previewPicture.style.transform = 'scale(' + parseInt(resizeVal.value, 10) / 100 + ')';
      previewPicture.style.transition = '0.3s';
    },
    increaseScale: function () {
      resizeVal.value = parseInt(resizeVal.value, 10) + parseInt(resizeVal.step, 10) + '%';
      if (parseInt(resizeVal.value, 10) > parseInt(resizeVal.max, 10)) {
        resizeVal.value = parseInt(resizeVal.max, 10) + '%';
      }
      window.manageScale.changeScale();
    },
    reduceScale: function () {
      resizeVal.value = parseInt(resizeVal.value, 10) - parseInt(resizeVal.step, 10) + '%';
      if (parseInt(resizeVal.value, 10) < parseInt(resizeVal.min, 10)) {
        resizeVal.value = parseInt(resizeVal.min, 10) + '%';
      }
      window.manageScale.changeScale();
    },
    onPreviewPictureScaleBtnpress: function (evt) {
      window.keyboardUtils.isPlusEvent(evt, window.manageScale.increaseScale);
      window.keyboardUtils.isMinusEvent(evt, window.manageScale.reduceScale);
    }
  };

  resizePlus.addEventListener('click', function () {
    window.manageScale.increaseScale();
  });

  resizeMinus.addEventListener('click', function () {
    window.manageScale.reduceScale();
  });
})();
