'use strict';

var KEYCODE_ENTER = 13;

var Pin = {
  HEIGHT: 65,
  WIDTH: 65,
};

var PinPsevdoAfter = {
  HEIGHT: 22,
  TRANSLATE_Y: 6
};

var adFormElement = document.querySelector('.ad-form');
var buttonResetElement = adFormElement.querySelector('.ad-form__reset');
var inputAddressElement = adFormElement.querySelector('#address');
var fieldsetElements = adFormElement.querySelectorAll('fieldset');
var mapElement = document.querySelector('.map');
var featuresElement = mapElement.querySelector('.map__features');
var filtersElement = mapElement.querySelector('.map__filters');
var filterElements = filtersElement.querySelectorAll('.map__filter');
var pinMainElement = mapElement.querySelector('.map__pin--main');

var isPageActive = null;

var pinCenterX = Pin.WIDTH / 2;
var pinActiveTotalHeight = Pin.HEIGHT + PinPsevdoAfter.HEIGHT - PinPsevdoAfter.TRANSLATE_Y;

var Coord = function (coord) {
  this.left = coord.left + window.pageXOffset;
  this.top = coord.top + window.pageYOffset;
};

Coord.prototype.getElementLocation = function (locationX, locationY) {
  return parseFloat(locationX) + ', ' + parseFloat(locationY);
};

Coord.prototype.setPinAddress = function (location) {
  inputAddressElement.value = location;
};

var pinMainCoord = new Coord(pinMainElement.getBoundingClientRect());

var toggleDisabledStateOfElements = function (elements, isDisabled) {
  elements.forEach(function (element) {
    element.disabled = isDisabled;
  });
};

var toggleDisabledStateOfPage = function (isDisabled) {
  toggleDisabledStateOfElements(fieldsetElements, isDisabled);
  toggleDisabledStateOfElements(filterElements, isDisabled);
  featuresElement.disabled = isDisabled;
};

var activateState = function () {
  if (isPageActive) {
    isPageActive = false;
    adFormElement.classList.remove('ad-form--disabled');

    window.pins.show(window.data.adverts());
    pinMainCoord.setPinAddress(pinMainCoord.getElementLocation(Math.round(pinMainCoord.left + pinCenterX),
        Math.round(pinMainCoord.top + pinActiveTotalHeight)));
    toggleDisabledStateOfPage(isPageActive);
  }
};

var deactivateState = function () {
  isPageActive = true;

  pinMainCoord.setPinAddress(pinMainCoord.getElementLocation(Math.round(pinMainCoord.left + pinCenterX),
      Math.round(pinMainCoord.top + Pin.HEIGHT / 2)));
  toggleDisabledStateOfPage(isPageActive);
};

deactivateState();

buttonResetElement.addEventListener('click', function () {
  deactivateState();
});

pinMainElement.addEventListener('mousedown', function () {
  activateState();
});

pinMainElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ENTER && mapElement.classList.contains('map--faded')) {
    activateState();
  }
});
