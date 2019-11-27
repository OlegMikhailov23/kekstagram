'use strict';

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
  show(bigPicture, pictStore);
  renderCommentList(pictStore[0]);
  hide('.social__comment-count', '.social__loadmore');
};

start();
