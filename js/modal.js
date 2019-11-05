'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var onModalCloseKeyDown = function (evt) {
    if (window.util.isKeyCode(evt, window.util.KEYCODE_ESC)) {
      hideModalError();

      document.removeEventListener('keydown', onModalCloseKeyDown);
    }
  };

  var hideModalError = function () {
    var errorElement = document.querySelector('.error');

    if (errorElement) {
      errorElement.remove();
    }
  };

  var showModalError = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = message;

    errorElement.addEventListener('click', function (evt) {
      var element = document.elementFromPoint(evt.clientX, evt.clientY);

      if (element.classList.contains('error') || element.classList.contains('error__button')) {
        hideModalError();
      }
    });

    document.addEventListener('keydown', onModalCloseKeyDown);

    document.querySelector('main').appendChild(errorElement);
  };

  window.modal = {
    showError: showModalError
  };
})();
