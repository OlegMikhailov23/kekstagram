'use strict';

(function () {

  var uploadForm = window.uploadFormData.uploadForm;

  var openForm = document.querySelector('.img-upload__input');

  var uploadWorkspace = document.querySelector('.img-upload__overlay');

  var closeUploadForm = document.querySelector('.img-upload__cancel');

  var previewPicture = window.uploadFormData.previewPicture;


  var onFormEscpress = function (evt) {
    window.keyboardUtils.isEscEvent(evt, closeForm);
  };


  var onUploadbtnChange = function () {
    uploadWorkspace.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscpress);
    document.addEventListener('keydown', window.uploadFormData.onPreviewPictureScaleBtnpress);
  };

  var closeForm = function () {
    uploadWorkspace.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscpress);
    document.removeEventListener('keydown', window.uploadFormData.onPreviewPictureScaleBtnpress);
    uploadForm.reset();
    keepUploadFormToDefault();
  };

  var keepUploadFormToDefault = function () {
    window.uploadFormData.scalePin.classList.add('hidden');
    previewPicture.style.transform = 'scale(1)';
    previewPicture.classList = 'img-upload__preview';
    previewPicture.removeAttribute('style');
    window.uploadFormData.hashTag.style.borderColor = 'initial';
  };

  openForm.addEventListener('change', onUploadbtnChange);

  closeUploadForm.addEventListener('click', function () {
    closeForm();
  });
})();
