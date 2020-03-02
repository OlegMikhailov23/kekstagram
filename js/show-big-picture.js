'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');

  var bigPictureClose = document.querySelector('.big-picture__cancel');

  var makeElement = function (tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };

  var hide = function (block1, block2) {
    document.querySelector(block1).classList.add('visually-hidden');
    document.querySelector(block2).classList.add('visually-hidden');
  };

  var show = function (element, array, number) {
    element.querySelector('img').src = array[number].url;
    element.querySelector('.comments-count').textContent = array[number].comments.length;
    element.querySelector('.likes-count').textContent = array[number].likes;
    element.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscpress);
  };

  // Создаем элемент для одной строчки комментария

  var createComments = function (element, comments, i) {
    var commentItem = makeElement('li', 'social__comment');
    var commentImg = makeElement('img', 'social__picture');
    var commentDescription = document.querySelector('.social__caption');
    commentItem.classList.add('social__comment--text');
    commentImg.src = element.comments[i].avatar;
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
      var commentText = makeElement('p', 'social__text', element.comments[i].message);
      var listItem = createComments(element, element.comments, i);
      listItem.appendChild(commentText);
      commentBlock.appendChild(listItem);
    }
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscpress);
  };

  var onBigPictureEscpress = function (evt) {
    window.keyboardUtils.isEscEvent(evt, closeBigPicture);
  };

  bigPictureClose.addEventListener('click', closeBigPicture);

  window.onUserPictureClick = function (evt, array) {
    var target = evt.target.closest('a');
    if (target === null) {
      return;
    } else if (target.hasAttribute(window.userPictureData.attrToSet)) {
      evt.preventDefault();
      var targetId = target.getAttribute(window.userPictureData.attrToSet);
      show(bigPicture, array, targetId);
      renderCommentList(array[targetId]);
      hide('.social__comment-count', '.social__loadmore');
    }
  };
})();
