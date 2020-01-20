'use strict';

(function () {
  window.uploadFormData = {
    uploadForm: document.querySelector('.img-upload__form'),
    scalePin: document.querySelector('.img-upload__scale'),
    hashTag: document.querySelector('.text__hashtags'),
    previewPicture: document.querySelector('.img-upload__preview'),

    onPreviewPictureScaleBtnpress: function (evt) {
      window.keyboardUtils.isPlusEvent(evt, increaseScale());
      window.keyboardUtils.isMinusEvent(evt, reduceScale());
    }
  }
})();
