'use strict';

var ESC_KEYCODE = 27;

var ENTER_KEYCODE = 13;

var PLUS_KEYCODE = 187;

var MINUS_KEYCODE = 189;

var pictStore = [];

var pictureAmount = 25;

var pictUrls = [];

var likes = [];

var pictKeys = ['url', 'likes', 'comments', 'description'];

var description = ['Тестим новую камеру', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var pictData = [pictUrls, likes, comments, description];

var picturesBlock = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var bigPicture = document.querySelector('.big-picture');

var bigPictureClose = document.querySelector('.big-picture__cancel');

var likeRange = {
  min: 15,
  max: 1500
};

// Функция для создания элемента

var makeElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

// shuffle - для перемешивания массива
var shuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
};

// getRandomNumber - для создания рандомных чисел в диапазоне min-max
var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// Создаем массивы для URL и Likes, массив pictUrls перемешиваем
var getUrlsLikes = function () {
  for (var i = 1; i <= pictureAmount; i++) {
    var pictUrl = 'photos/' + i + '.jpg';
    pictUrls.push(pictUrl);

    // Массив pictUrls перемешиваем

    shuffle(pictUrls);
    var like = getRandomNumber(likeRange.min, likeRange.max);
    likes.push(like);
  }
};

// Создаем массив объектов
var getPictData = function (mainArray, arrKeys, arrData, arrComments, arrUrls) {
  for (var i = 0; i < pictureAmount; i++) {
    var someObj = {};
    var someMassive = []; // Заготовка для комментариев
    for (var j = 0; j < arrKeys.length; j++) {
      someObj[arrKeys[j]] = arrData[j][
        [Math.floor(Math.random() * arrData[j].length)]
      ];
      if (arrKeys[j] === 'comments') {
        for (var k = 0; k < getRandomNumber(1, 2); k++) {
          someMassive.push(arrComments[Math.floor(Math.random() * arrComments.length)]);
        }
      }
    }
    pictStore.push(someObj);
    mainArray[i].comments = someMassive;
    mainArray[i].url = arrUrls[i];
  }
};

// Создаем DOM элемент
var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
  return pictureElement;
};

// Отрисовываем DOM элементы на странице

var pushInDock = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictureAmount; i++) {
    fragment.appendChild(renderPicture(pictStore[i]));
  }
  picturesBlock.appendChild(fragment);
};

// Показываем большую картинку

var show = function (element, mainArray, number) {
  element.querySelector('img').src = mainArray[number].url;
  element.querySelector('.comments-count').textContent = mainArray[number].comments.length;
  element.querySelector('.likes-count').textContent = mainArray[number].likes;
  element.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscpress);
};

// Создаем элемент для одной строчки комментария

var createComments = function (element) {
  var commentItem = makeElement('li', 'social__comment');
  var commentImg = makeElement('img', 'social__picture');
  var commentDescription = document.querySelector('.social__caption');
  commentItem.classList.add('social__comment--text');
  commentImg.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  commentImg.alt = 'Аватар комментатора фотографии';
  commentDescription.textContent = element.description;
  commentItem.appendChild(commentImg);
  return commentItem;
};

// Выводим список комментариев в документ, используя массив "comments"

var clearList = function (element) { // Очищаем список комментариев
  var collection = document.querySelectorAll(element);
  for (var i = 0; i < collection.length; i++) {
    collection[i].remove();
  }
};

var renderCommentList = function (element) {
  clearList('.social__comment');
  var commentBlock = document.querySelector('.social__comments');
  for (var i = 0; i < element.comments.length; i++) {
    var commentText = makeElement('p', 'social__text', element.comments[i]);
    var listItem = createComments(element);
    listItem.appendChild(commentText);
    commentBlock.appendChild(listItem);
  }
};

// Прячем необходимые блоки

var hide = function (block1, block2) {
  document.querySelector(block1).classList.add('visually-hidden');
  document.querySelector(block2).classList.add('visually-hidden');
};

var setAttr = function (el, attrName) {
  var collection = document.querySelectorAll(el);
  for (var i = 0; i < collection.length; i++) {
    collection[i].setAttribute(attrName, i);
  }
};
// Собираем массив объектов (generateData):

var userPictureData = {
  userPictureClass: 'picture__img',
  attrToSet: 'user-picture-id'
};

var generateData = function () {
  getUrlsLikes();
  getPictData(pictStore, pictKeys, pictData, comments, pictUrls);
  pushInDock();
  hide('.social__comment-count', '.social__loadmore');
  setAttr('.' + userPictureData.userPictureClass, userPictureData.attrToSet); // Проставляем у всех элементов с классом picture__img атрибут user-picture-id
};

generateData();

// Работа над сценарием
// Сценарий полноэкранного режима пользовательских фото:

var onUserPictureClick = function (evt) {
  var target = evt.target;
  var targetId = target.getAttribute(userPictureData.attrToSet);
  if (target.className !== userPictureData.userPictureClass) {
    return;
  } else {
    evt.preventDefault();
    show(bigPicture, pictStore, targetId);
    renderCommentList(pictStore[targetId]);
  }
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscpress);
};

var onBigPictureEscpress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

picturesBlock.addEventListener('click', onUserPictureClick);

bigPictureClose.addEventListener('click', closeBigPicture);


// Сценарий формы загрузки:

var uploadForm = document.querySelector('.img-upload__form');

var openForm = uploadForm.querySelector('.img-upload__input');

var uploadWorkspace = uploadForm.querySelector('.img-upload__overlay');

var closeUploadForm = uploadForm.querySelector('.img-upload__cancel');

var previewPicture = uploadForm.querySelector('.img-upload__preview');

// Перемнные для управления масштабом изображения формы

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

var onFormEscpress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeForm();
    openForm.value = '';
  }
};

var onUploadbtnChange = function () {
  uploadWorkspace.classList.remove('hidden');
  document.addEventListener('keydown', onFormEscpress);
  document.addEventListener('keydown', onPreviewPictureScaleBtnpress);
  document.addEventListener('keydown', onPreviewPictureScaleBtnpress);
};

var closeForm = function () {
  uploadWorkspace.classList.add('hidden');
  document.removeEventListener('keydown', onFormEscpress);
  document.removeEventListener('keydown', onPreviewPictureScaleBtnpress);
  document.removeEventListener('keydown', onPreviewPictureScaleBtnpress);
  keepUploadFormToDefault();
};

var keepUploadFormToDefault = function () {
  scalePin.classList.add('hidden');
  previewPicture.style.transform = 'scale(1)';
  previewPicture.classList = 'img-upload__preview';
  previewPicture.removeAttribute('style');
  hashTag.style.borderColor = 'initial';
  uploadForm.reset();
};

openForm.addEventListener('change', onUploadbtnChange);

closeUploadForm.addEventListener('click', function () {
  closeForm();
  openForm.value = '';
});

// Работа с изображением
//
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
