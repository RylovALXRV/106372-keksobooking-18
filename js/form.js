'use strict';

(function () {

  var adFormElement = document.querySelector('.ad-form');
  var buttonResetElement = adFormElement.querySelector('.ad-form__reset');
  var fieldsetElements = adFormElement.querySelectorAll('fieldset');
  var inputAddressElement = adFormElement.querySelector('#address');

  var setAddress = function (location) {
    inputAddressElement.value = location;
  };

  var activateStateForm = function () {
    adFormElement.classList.remove('ad-form--disabled');

    setAddress(window.mainPin.activeLocation);
    window.util.toggleDisabledStateOfElements(fieldsetElements, false);
  };

  var initStateForm = function () {
    adFormElement.classList.add('ad-form--disabled');

    setAddress(window.mainPin.initLocation);
    window.util.toggleDisabledStateOfElements(fieldsetElements, true);
  };

  buttonResetElement.addEventListener('click', function () {
    initStateForm();
  });

  window.form = {
    activate: activateStateForm,
    init: initStateForm,
    setAddress: setAddress
  };
})();
