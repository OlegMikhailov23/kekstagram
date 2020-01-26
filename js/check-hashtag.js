'use strict';

(function () {

  var hashTag = window.uploadFormData.hashTag;

  var submitBtn = document.querySelector('#upload-submit');

  // Проверка Хэш-тегов и комментария
  var tagData = {
    maxTagAmount: 5,
    minTagCharAmount: 2,
    maxTagCharAmount: 20,
    tagSign: '#'
  };

  var errorMessageData = {
    tagBegin: 'Хэштег должен начинаться с ' + tagData.tagSign,
    minTagChar: 'Хэштег должен состоять минимум из ' + tagData.minTagCharAmount + ' символов и не может состоять только из #',
    maxTagChar: 'Один хэштег не может быть больше ' + tagData.maxTagCharAmount + ' символов',
    tagSpaced: 'Хэштеги должны отделяться между собой пробелами',
    tagRepeat: 'Хэштеги не должны повторяться',
    maxTags: 'Укажите не больше ' + tagData.maxTagAmount + ' тегов'
  };

  var splitString = function (string) {
    var space = ' ';
    var array = string.split(space);
    return array;
  };

  var clearCustomValidity = function (el) {
    el.setCustomValidity('');
  };

  var highLightInvalid = function (el, validColor, invalidColor) {
    if (el.validity.customError) {
      el.style.borderColor = invalidColor;
    } else {
      el.style.borderColor = validColor;
    }
  };

  var checkHashTags = function () {
    if (hashTag.value !== '') {
      var hashTagValue = hashTag.value.toLowerCase();
      var hashTagsArray = splitString(hashTagValue);
      var hashTagRepeatCount = 0;
      for (var j = 0; j < hashTagsArray.length; j++) {
        var count = 0;
        for (var k = j + 1; k < hashTagsArray.length; k++) {
          if (hashTagsArray[j] === hashTagsArray[k]) {
            hashTagRepeatCount++;
          }
        }
        for (var l = 0; l < hashTagsArray[j].length; l++) {
          if (hashTagsArray[j].charAt(l) === tagData.tagSign) {
            count++;
          }
        }
        if (hashTagsArray[j].charAt(0) !== tagData.tagSign) {
          hashTag.setCustomValidity(errorMessageData.tagBegin);
        } else if (hashTagsArray[j].length < tagData.minTagCharAmount) {
          hashTag.setCustomValidity(errorMessageData.minTagChar);
        } else if (count > 1) {
          hashTag.setCustomValidity(errorMessageData.tagSpaced);
        } else if (hashTagRepeatCount > 0) {
          hashTag.setCustomValidity(errorMessageData.tagRepeat);
        } else if (j + 1 > tagData.maxTagAmount) {
          hashTag.setCustomValidity(errorMessageData.maxTags);
        } else if (hashTagsArray[j].length > tagData.maxTagCharAmount) {
          hashTag.setCustomValidity(errorMessageData.maxTagChar);
        }
      }
    }
    highLightInvalid(hashTag, '#66fa5f', '#f74921'); // Подсветим поле, при вводе
  };

  // submitBtn.addEventListener('click', onSubmitClick);

  hashTag.addEventListener('input', function () {
    clearCustomValidity(hashTag);
    checkHashTags();
  });
})();
