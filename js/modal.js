'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var onModalCloseKeyDown = function (evt) {
    if (window.util.isEscEvent(evt)) {
      hideModal();
    }
  };

  var hideModal = function () {
    var modalElement = document.querySelector('.modal');

    if (modalElement) {
      modalElement.remove();

      document.removeEventListener('keydown', onModalCloseKeyDown);
    }
  };

  var showModalError = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = message;

    errorElement.addEventListener('click', function (evt) {
      var element = document.elementFromPoint(evt.clientX, evt.clientY);

      if (element.classList.contains('error') || element.classList.contains('error__button')) {
        hideModal();
      }
    });
    document.addEventListener('keydown', onModalCloseKeyDown);
    document.querySelector('main').appendChild(errorElement);
  };

  var showModalSuccess = function () {
    var successElement = successTemplate.cloneNode(true);

    successElement.addEventListener('click', function (evt) {
      var element = document.elementFromPoint(evt.clientX, evt.clientY);

      if (element.classList.contains('success')) {
        hideModal();
      }
    });
    document.addEventListener('keydown', onModalCloseKeyDown);
    document.querySelector('main').appendChild(successElement);
  };

  window.modal = {
    showError: showModalError,
    showSuccess: showModalSuccess
  };
})();
