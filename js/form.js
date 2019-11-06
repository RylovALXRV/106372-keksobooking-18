'use strict';

(function () {

  var adFormElement = document.querySelector('.ad-form');
  var buttonResetElement = adFormElement.querySelector('.ad-form__reset');
  var featuresElement = adFormElement.querySelector('.features');
  var fieldsetElements = adFormElement.querySelectorAll('fieldset');
  var inputAddressElement = adFormElement.querySelector('#address');
  var typeElement = adFormElement.querySelector('#type');

  var setAddress = function (location) {
    inputAddressElement.value = location;
  };

  var resetForm = function () {
    adFormElement.querySelector('#avatar').value = '';
    adFormElement.querySelector('#capacity').value = '1';
    adFormElement.querySelector('#description').value = '';
    adFormElement.querySelector('#images').value = '';
    adFormElement.querySelector('#price').value = '';
    adFormElement.querySelector('#room_number').value = '1';
    adFormElement.querySelector('#timein').value = '12:00';
    adFormElement.querySelector('#timeout').value = '12:00';
    adFormElement.querySelector('#title').value = '';
    typeElement.value = 'flat';

    setAddress(window.mainPin.initLocation);
    window.util.resetFeaturesInputField(featuresElement);
    window.validation.setDefaultPrice(typeElement);
  };

  var activateStateForm = function () {
    adFormElement.classList.remove('ad-form--disabled');

    setAddress(window.mainPin.activeLocation);
    window.util.toggleDisabledStateOfElements(fieldsetElements, false);
  };

  var initStateForm = function () {
    adFormElement.classList.add('ad-form--disabled');

    resetForm();
    setAddress(window.mainPin.initLocation);
    window.util.toggleDisabledStateOfElements(fieldsetElements, true);
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
