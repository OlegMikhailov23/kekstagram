'use strict';

(function() {
    var renderError = function (template) {
    var errorTemplate = template;
    var errorElement = errorTemplate.cloneNode(true);
    return errorElement
  };

  window.pushError = function (template) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderError(template));
    window.uploadFormData.uploadWorkspace.appendChild(fragment);
  }
})();
