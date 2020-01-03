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
    var like = getRandomNumber(15, 500);
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

var show = function (element, mainArray) {
  element.classList.remove('hidden');
  element.querySelector('img').src = mainArray[0].url;
  element.querySelector('.comments-count').textContent = mainArray[0].comments.length;
  element.querySelector('.likes-count').textContent = mainArray[0].likes;
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

var renderCommentList = function (element) {
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

// Собираем все функции в одну (start) и запускаем ее

var start = function () {
  getUrlsLikes();
  getPictData(pictStore, pictKeys, pictData, comments, pictUrls);
  pushInDock();
  // show(bigPicture, pictStore);
  renderCommentList(pictStore[0]);
  hide('.social__comment-count', '.social__loadmore');
};
start();

// Работа над сценарием

var downloadForm = document.querySelector('.img-upload__form');

var openForm = downloadForm.querySelector('.img-upload__input');

var downloadWorkspace = downloadForm.querySelector('.img-upload__overlay');

var closeDownloadForm = downloadForm.querySelector('.img-upload__cancel');

var previewPicture = downloadForm.querySelector('.img-upload__preview');

// Перемнные для управления масштабом изображения формы

var resizeMinus = downloadForm.querySelector('.resize__control--minus');

var resizePlus = downloadForm.querySelector('.resize__control--plus');

var resizeVal = downloadForm.querySelector('.resize__control--value');

// Перемнные для управления эффектами

var effectBlock = downloadForm.querySelector('.effects__list');

var scalePin = downloadForm.querySelector('.img-upload__scale');

var scaleLine = downloadForm.querySelector('.scale__line');

var getCurrentEffectVal = function (evt) {
  var target = evt.target;
  var value = target.value;
  return value;
};


var onFormEscpress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeForm();
    openForm.value = '';
  }
};

var onDownloadbtnChange = function () {
  downloadWorkspace.classList.remove('hidden');
  document.addEventListener('keydown', onFormEscpress);
  document.addEventListener('keydown', onPreviewPicturePluspress);
  document.addEventListener('keydown', onPreviewPictureMinuspress);
};

var closeForm = function () {
  downloadWorkspace.classList.add('hidden');
  document.removeEventListener('keydown', onFormEscpress);
  document.removeEventListener('keydown', onPreviewPicturePluspress);
  document.removeEventListener('keydown', onPreviewPictureMinuspress);
  previewPicture.style.transform = 'scale(1)';
};

openForm.addEventListener('change', onDownloadbtnChange);

closeDownloadForm.addEventListener('click', function () {
  closeForm();
  openForm.value = '';
});

closeDownloadForm.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeForm();
    openForm.value = '';
  }
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

var onPreviewPicturePluspress = function (evt) {
  if (evt.keyCode === PLUS_KEYCODE) {
    increaseScale();
  }
};

var onPreviewPictureMinuspress = function (evt) {
  if (evt.keyCode === MINUS_KEYCODE) {
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

var getPinPosition = function (evt) {
  var upCoordinate = evt.clientX - scaleLine.getBoundingClientRect().x;
  return upCoordinate;
};

var getStyleValue = function (min, max, shift) {
  var value = ((max - min) * shift + min).toFixed(2);
  return value;
};

var changeStyle = function (currentEffect, value, prefix) {
  var changedStyle = currentEffect + '(' + value + prefix + ')';
  return changedStyle;
};

var switchEffect = function (evt) {
  var currentEffect = evt.target;
  var currentEffectVal = getCurrentEffectVal(evt);
  currentEffectVal !== 'none' ? scalePin.classList.remove('hidden') : scalePin.classList.add('hidden');
  if (currentEffect.name !== 'effect') {
    return;
  } else {
    previewPicture.classList = 'img-upload__preview';
    previewPicture.classList.add(filterMap[currentEffectVal].class);
    previewPicture.removeAttribute('style');
  }
};

var onScaleMouseup = function (evt) {
  var currentFilterVal = downloadForm.querySelector('input[type="radio"]:checked').value;
  var prefix = filterMap[currentFilterVal].prefix || '';
  var currentFilterStyle = filterMap[currentFilterVal].css;
  var upCoordinate = getPinPosition(evt);
  var shiftCssValue = parseFloat((upCoordinate / pinPosition.maxPinPosition)).toFixed(2);
  var value = getStyleValue(filterMap[currentFilterVal].min, filterMap[currentFilterVal].max, shiftCssValue);
  if (value > filterMap[currentFilterVal].max) {
    value = filterMap[currentFilterVal].max;
  }
  previewPicture.style.filter = changeStyle(currentFilterStyle, value, prefix);
};

effectBlock.addEventListener('click', function (evt) {
  switchEffect(evt);
});

scalePin.addEventListener('mouseup', onScaleMouseup);
