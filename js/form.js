'use strict';

(function () {

  var adFormElement = document.querySelector('.ad-form');
  var buttonResetElement = adFormElement.querySelector('.ad-form__reset');
  var fieldsetElements = adFormElement.querySelectorAll('fieldset');
  var inputAddressElement = adFormElement.querySelector('#address');
  var typeElement = adFormElement.querySelector('#type');

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
    adFormElement.reset();
    setAddress(window.mainPin.initLocation);

    window.upload.hide();
    window.util.toggleDisabledStateOfElements(fieldsetElements, true);
    window.validation.setDefaultPrice(typeElement);
  };

  var sendSuccessForm = function () {
    window.page.deactivate();
    window.modal.showSuccess();
  };

  buttonResetElement.addEventListener('click', function () {
    window.page.deactivate();
  });

  adFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(adFormElement), sendSuccessForm, window.modal.showError);
  });

  window.form = {
    activate: activateStateForm,
    init: initStateForm,
    setAddress: setAddress
  };
})();
