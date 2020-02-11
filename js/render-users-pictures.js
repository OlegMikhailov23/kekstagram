'use strict';

(function () {
  var picturesBlock = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  // var pictStore = window.generatePictData; // Иссользуется при генерации МОК данных

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
    return pictureElement;
  };

  var pushInDock = function (userPictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < userPictures.length; i++) {
      fragment.appendChild(renderPicture(userPictures[i]));
    }
    picturesBlock.appendChild(fragment);
  };

  var setAttr = function (el, attrName) {
    var collection = document.querySelectorAll(el);
    for (var i = 0; i < collection.length; i++) {
      collection[i].setAttribute(attrName, i);
    }
  };

  // Отрисовываем DOM элементы на странице

  var successHandler = function (userPictures) {
    window.dataUserPictures = userPictures; // Записываем результат запроса на сервер в глобальную переменную
    pushInDock(userPictures);
    setAttr('.' + window.userPictureData.userPictureClass, window.userPictureData.attrToSet);
  };

  window.backend.load(successHandler, window.backend.infoHandler, URL_LOAD);
})();
