'use strict';

(function () {
  var pictStore = [];

  var pictureAmount = 25;

  var pictUrls = [];

  var likes = [];

  var pictKeys = ['url', 'likes', 'comments', 'description'];

  var description = ['Тестим новую камеру', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

  var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var pictData = [pictUrls, likes, comments, description];

  var likeRange = {
    min: 15,
    max: 500
  };

   var commentRange = {
    min: 1,
    max: 2
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

  // 2.- формирование массива данных (МОК)
  // Создаем массивы для URL и Likes, массив pictUrls перемешиваем
  var getUrls = function () {
    for (var i = 1; i <= pictureAmount; i++) {
      var pictUrl = 'photos/' + i + '.jpg';
      pictUrls.push(pictUrl);
    }
    shuffle(pictUrls);
  };

  var generateLikes = function () {
    for (var i = 1; i <= pictureAmount; i++) {
      var like = window.mathUtils.getRandomNumber(likeRange.min, likeRange.max);
      likes.push(like);
    }
  }

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
          for (var k = 0; k < window.mathUtils.getRandomNumber(commentRange.min, commentRange.max); k++) {
            someMassive.push(arrComments[Math.floor(Math.random() * arrComments.length)]);
          }
        }
      }
      pictStore.push(someObj);
      mainArray[i].comments = someMassive;
      mainArray[i].url = arrUrls[i];
    }
    return pictStore;
  };
  getUrls();
  generateLikes();
  window.generatePictData = getPictData(pictStore, pictKeys, pictData, comments, pictUrls);
})();
