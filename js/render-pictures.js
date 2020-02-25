'use strict';

(function () {
  var picturesBlock = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var setAttr = function (el, attrName) {
    var collection = document.querySelectorAll(el);
    for (var i = 0; i < collection.length; i++) {
      collection[i].setAttribute(attrName, i);
    }
  };

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
    return pictureElement;
  };

  window.pushInDock = function (data, elAmount) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < elAmount; i++) {
      fragment.appendChild(renderPicture(data[i]));
    }
    picturesBlock.appendChild(fragment);
    setAttr('.' + window.userPictureData.userPictureClass, window.userPictureData.attrToSet);
  };
})();
