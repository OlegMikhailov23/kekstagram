'use strict';

(function () {

  var uploadForm = window.uploadFormData.uploadForm;

  var previewPicture = window.uploadFormData.previewPicture;

  var hashTag = window.uploadFormData.hashTag;

  var uploadWorkspace = window.uploadFormData.uploadWorkspace;

  var formComment = document.querySelector('.text__description');

  var openForm = document.querySelector('.img-upload__input');

  var closeUploadForm = document.querySelector('.img-upload__cancel');

  var URL_SAVE = 'https://js.dump.academy/kekstagram';

  var onFormEscpress = function (evt) {
    window.keyboardUtils.isEscEvent(evt, closeForm);
  };

  var onUploadbtnChange = function () {
    uploadWorkspace.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscpress);
    document.addEventListener('keydown', window.manageScale.onPreviewPictureScaleBtnpress);
  };

  var closeForm = function () {
    uploadWorkspace.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscpress);
    document.removeEventListener('keydown', window.manageScale.onPreviewPictureScaleBtnpress);
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

  hashTag.addEventListener('focus', function () {
    document.removeEventListener('keydown', onFormEscpress);
  });

  hashTag.addEventListener('blur', function () {
    document.addEventListener('keydown', onFormEscpress);
  });

  formComment.addEventListener('focus', function () {
    document.removeEventListener('keydown', onFormEscpress);
  });

  formComment.addEventListener('blur', function () {
    document.addEventListener('keydown', onFormEscpress);
  });

  openForm.addEventListener('change', onUploadbtnChange);

  closeUploadForm.addEventListener('click', function () {
    closeForm();
  });

  var sendSuccess = function () {
    closeForm();
  };

  uploadForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(uploadForm), sendSuccess, window.backend.errorSaveHandler, URL_SAVE);
    evt.preventDefault();
  });
})();
