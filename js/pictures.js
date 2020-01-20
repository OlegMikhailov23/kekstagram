'use strict';

var resizeMinus = uploadForm.querySelector('.resize__control--minus');

var resizePlus = uploadForm.querySelector('.resize__control--plus');

var resizeVal = uploadForm.querySelector('.resize__control--value');

var defaultScale = 100 + '%';

// Перемнные для управления эффектами

var effectBlock = uploadForm.querySelector('.effects__list');

var scalePin = uploadForm.querySelector('.img-upload__scale');

var scaleLine = uploadForm.querySelector('.scale__line');

var scaleValue = uploadForm.querySelector('.scale__value');

var scalePinValueDefault = 100;

var effectValue = 'none'; // необходима для передачи переменной между функциями

// 1) Управление масштабом

var changeScale = function () {
  previewPicture.style.transform = 'scale(' + parseInt(resizeVal.value, 10) / 100 + ')';
  previewPicture.style.transition = '0.3s';
};

var increaseScale = function () {
  resizeVal.value = parseInt(resizeVal.value, 10) + parseInt(resizeVal.step, 10) + '%';
  if (parseInt(resizeVal.value, 10) > parseInt(resizeVal.max, 10)) {
    resizeVal.value = parseInt(resizeVal.max, 10) + '%';
  }
  changeScale();
};

var reduceScale = function () {
  resizeVal.value = parseInt(resizeVal.value, 10) - parseInt(resizeVal.step, 10) + '%';
  if (parseInt(resizeVal.value, 10) < parseInt(resizeVal.min, 10)) {
    resizeVal.value = parseInt(resizeVal.min, 10) + '%';
  }
  changeScale();
};

var onPreviewPictureScaleBtnpress = function (evt) {
  if (evt.keyCode === PLUS_KEYCODE) {
    increaseScale();
  } else if (evt.keyCode === MINUS_KEYCODE) {
    reduceScale();
  }
};

resizePlus.addEventListener('click', function () {
  increaseScale();
});

resizeMinus.addEventListener('click', function () {
  reduceScale();
});

// 2) Управление фильтрами

var pinPosition = {
  minPinPosition: 0,
  maxPinPosition: 450
};

var filterMap = {
  none: {
    class: 'effects__preview--none'
  },
  chrome: {
    class: 'effects__preview--chrome',
    css: 'grayscale',
    max: 1,
    min: 0
  },
  sepia: {
    class: 'effects__preview--sepia',
    css: 'sepia',
    max: 1,
    min: 0
  },
  marvin: {
    class: 'effects__preview--marvin',
    css: 'invert',
    max: 100,
    min: 0,
    prefix: '%'
  },
  phobos: {
    class: 'effects__preview--phobos',
    css: 'blur',
    max: 3,
    min: 0,
    prefix: 'px'
  },
  heat: {
    class: 'effects__preview--heat',
    css: 'brightness',
    max: 3,
    min: 1
  }
};
// Определение позиции на шкале бара
var getPinPosition = function (evt) {
  var upCoordinate = evt.clientX - scaleLine.getBoundingClientRect().x;
  return upCoordinate;
};
// Определение значения css стиля для фильтра
var getStyleValue = function (min, max, shift) {
  var value = ((max - min) * shift + min).toFixed(2);
  return value;
};
// Генерация значения для css свойства filter
var generateFilterValue = function (currentEffect, value, prefix) {
  var changedStyle = currentEffect + '(' + value + prefix + ')';
  return changedStyle;
};
// Сбрасываем масштаб картинки, значение текущего свойства css у выбранного эффекта при переключении между фильтрами
var keepEffectToDefault = function (currentEffectVal) {
  previewPicture.classList = 'img-upload__preview';
  previewPicture.classList.add(filterMap[currentEffectVal].class);
  previewPicture.style.transform = 'scale(1)';
  resizeVal.value = defaultScale;
  previewPicture.removeAttribute('style');
};
// Переключаемся между эффектами
var switchEffect = function (evt) {
  var currentEffect = evt.target;
  var currentEffectVal = currentEffect.value;
  effectValue = currentEffectVal; // перезаписываем переменную effectValue
  currentEffectVal !== 'none' ? scalePin.classList.remove('hidden') : scalePin.classList.add('hidden');
  if (currentEffect.name !== 'effect') {
    return;
  } else {
    keepEffectToDefault(currentEffectVal);
  }
};
// Управляем ефффектами при помощи бара (пока при mouseup)
var onScaleMouseup = function (evt) {
  var prefix = filterMap[effectValue].prefix || '';
  var currentFilterStyle = filterMap[effectValue].css;
  var upCoordinate = getPinPosition(evt);
  var shiftCssValue = parseFloat((upCoordinate / pinPosition.maxPinPosition)).toFixed(2);
  scaleValue.value = shiftCssValue * scalePinValueDefault;
  var value = getStyleValue(filterMap[effectValue].min, filterMap[effectValue].max, shiftCssValue);
  if (value > filterMap[effectValue].max) {
    value = filterMap[effectValue].max;
  }
  if (scaleValue.value > scalePinValueDefault) {
    scaleValue.value = scalePinValueDefault;
  }
  previewPicture.style.filter = generateFilterValue(currentFilterStyle, value, prefix);
};

effectBlock.addEventListener('click', function (evt) {
  switchEffect(evt);
});

scalePin.addEventListener('mouseup', onScaleMouseup);

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

var hashTag = uploadForm.querySelector('.text__hashtags');

var formComment = uploadForm.querySelector('.text__description');

var submitBtn = uploadForm.querySelector('#upload-submit');

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
