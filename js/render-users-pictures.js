'use strict';

(function () {
  var picturesBlock = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var bigPicture = document.querySelector('.big-picture');

  var bigPictureClose = document.querySelector('.big-picture__cancel');

  var pictStore = window.generatePictData;

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
    for (var i = 0; i < pictStore.length; i++) {
      fragment.appendChild(renderPicture(pictStore[i]));
    }
    picturesBlock.appendChild(fragment);
  };

  pushInDock();
})();
