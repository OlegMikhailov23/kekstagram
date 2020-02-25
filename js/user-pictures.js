'use strict';

(function () {

  var AMOUNT_OF_NEWPICTURES = 10;

  var filtersContainer = document.querySelector('.img-filters');

  var filterPopular = document.querySelector('#filter-popular');

  var filterNew = document.querySelector('#filter-new');

  var filterDiscussed = document.querySelector('#filter-discussed');

  var userPicturesOrig;

  var userPicturesCopy;

  var userPictureRandomed;

  // var pictStore = window.generatePictData; // Иссользуется при генерации МОК данных

  var showFilters = function (className) {
    filtersContainer.classList.remove(className);
  };

  var clearUserPictures = function (className) {
    var collection = document.querySelectorAll(className);
    for (var i = 0; i < collection.length; i++) {
      collection[i].remove();
    }
  };

  var upDatePicturesNew = function (data) {
    window.dataUserPictures = data;
    window.pushInDock(data, AMOUNT_OF_NEWPICTURES);
  };

  var upDatePicturesPopular = function (data) {
    window.dataUserPictures = data;
    window.pushInDock(data, data.length);
  };

  var upDatePicturesDiscussed = function (data) {
    window.pushInDock(data.sort(function (left, right) {
      if (left.comments.length > right.comments.length) {
        return -1;
      } if (left.comments.length < right.comments.length) {
        return 1;
      } else {
        return 0;
      }
    }), data.length);
    window.dataUserPictures = data;
  };

  var switchHighLight = function (switched) {
    var resetClass = document.querySelector('.img-filters__button--active');
    resetClass.classList.remove('img-filters__button--active');
    switched.classList.add('img-filters__button--active');
  };

  filterNew.addEventListener('click', function () {
    clearUserPictures('.picture__link');
    upDatePicturesNew(userPictureRandomed);
    switchHighLight(filterNew);
  });

  filterPopular.addEventListener('click', function () {
    clearUserPictures('.picture__link');
    upDatePicturesPopular(userPicturesOrig);
    switchHighLight(filterPopular);
  });

  filterDiscussed.addEventListener('click', function () {
    clearUserPictures('.picture__link');
    upDatePicturesDiscussed(userPicturesCopy);
    switchHighLight(filterDiscussed);
  });

  // Отрисовываем DOM элементы на странице

  var successHandler = function (userPictures) {
    userPicturesOrig = userPictures;
    userPicturesCopy = userPictures.slice();
    userPictureRandomed = window.mathUtils.shuffleArray(userPictures.slice());
    window.dataUserPictures = userPictures;
    window.pushInDock(userPictures, userPictures.length);
    showFilters('img-filters--inactive');
  };

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  window.backend.load(successHandler, window.backend.infoHandler, URL_LOAD);
})();
