'use strict';

(function () {

  var adFormElement = document.querySelector('.ad-form');
  var buttonResetElement = adFormElement.querySelector('.ad-form__reset');

  buttonResetElement.addEventListener('click', function () {
    window.mainPin.deactivatePage();
  });
})();
