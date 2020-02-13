'use strict';
(function () {
  var makeXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText, 'red');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения!', 'red');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', 'red');
    });

    return xhr;
  };

  var makeInfoBlock = function (message, color) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 400px; text-align: center; box-shadow: 1px 0 15px 1px #000';
    node.style.position = 'fixed';
    node.style.backgroundColor = color;
    node.style.left = '50%';
    node.style.marginLeft = '-200px';
    node.style.top = '15%';
    node.style.padding = '3%';
    node.style.fontSize = '22px';
    node.style.lineHeight = '24px';
    node.style.borderRadius = '5px';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend = {

    load: function (onLoad, onError, url) {
      var xhr = makeXhr(onLoad, onError);
      xhr.open('GET', url);
      xhr.timeout = 10000;
      xhr.send();
    },
    save: function (data, onLoad, onError, url) {
      var xhr = makeXhr(onLoad, onError);
      xhr.open('POST', url);
      xhr.send(data);
    },

    infoHandler: function (message, color) {
      makeInfoBlock(message, color);
    },

    errorSaveHandler: function () {
      window.pushError(document.querySelector('#picture').content.querySelector('.img-upload__message--error'));
    }
  };

})();
