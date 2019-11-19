'use strict'

var pictStore = [];

var pictureAmount = 25;

var pictUrls = [];

var likes = [];

var pictKeys = ['url', 'likes', 'comments', 'description'];

var description = ['Тестим новую камеру', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var pictData = [pictUrls, likes, comments, description];

var picturesBlock = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');


// shuffle - для перемешивания массива
var shuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// getRandomNumber - для создания рандомных чисел в диапазоне min-max
var getRandomNumber = function(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

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
  console.log(pictUrls);
  console.log(likes);
  return pictUrls;
  return likes;
}

// Создаем массив объектов
var getPictData = function (arrKeys, arrData) {
  for (var i = 0; i < pictureAmount; i++) {
    var someObj = {};
    for (var j = 0; j < arrKeys.length; j++) {
      someObj[arrKeys[j]] = arrData[j][[Math.floor(Math.random() * arrData[j].length)]];
    }
    pictStore.push(someObj);
    }
    for (var k = 0; k < pictureAmount-1; k++) {
        pictStore[k].url = pictUrls[k];
    }
  console.log(pictStore);
};


// Создаем DOM элемент
  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments;
    console.log(pictureElement);
    return pictureElement;
};

// Отрисовываем элементы на странице

 var pushInDock = function ( ) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictureAmount; i++) {
    fragment.appendChild(renderPicture(pictStore[i]));
  }
  picturesBlock.appendChild(fragment);
 };


var total = function () {
  getUrlsLikes();
  getPictData(pictKeys, pictData);
  pushInDock();
};

total();
