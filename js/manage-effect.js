'use strict';

(function () {

  var previewPicture = window.uploadFormData.previewPicture;

  var scalePin = window.uploadFormData.scalePin;

  var resizeVal = window.uploadFormData.resizeVal;

  var effectBlock = document.querySelector('.effects__list');

  var scaleLine = document.querySelector('.scale__line');

  var scaleValue = document.querySelector('.scale__value');

  var scalePinValueDefault = 100;

  var defaultScale = 100 + '%';

  var effectValue = 'none'; // необходима для передачи переменной между функциями


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
})();
