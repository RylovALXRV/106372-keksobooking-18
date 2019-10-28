'use strict';

(function () {

  var Pin = {
    HEIGHT: 65,
    WIDTH: 65,

    psevdoAfter: {
      HEIGHT: 22,
      TRANSLATE_Y: 6
    }
  };

  var adFormElement = document.querySelector('.ad-form');
  var fieldsetElements = adFormElement.querySelectorAll('fieldset');
  var inputAddressElement = adFormElement.querySelector('#address');
  var mapElement = document.querySelector('.map');
  var featuresElement = mapElement.querySelector('.map__features');
  var pinMainElement = mapElement.querySelector('.map__pin--main');
  var filtersElement = mapElement.querySelector('.map__filters');
  var filterElements = filtersElement.querySelectorAll('.map__filter');

  var isPageActive = null;

  var pinCenterX = Pin.WIDTH / 2;
  var pinActiveTotalHeight = Pin.HEIGHT + Pin.psevdoAfter.HEIGHT - Pin.psevdoAfter.TRANSLATE_Y;

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

  var toggleDisabledStateOfPage = function (isDisabled) {
    window.util.toggleDisabledStateOfElements(fieldsetElements, isDisabled);
    window.util.toggleDisabledStateOfElements(filterElements, isDisabled);
    featuresElement.disabled = isDisabled;
  };

  var activateState = function () {
    if (isPageActive) {
      isPageActive = false;
      adFormElement.classList.remove('ad-form--disabled');

      window.pins.show(window.data.generate());
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

  window.mainPin = {
    activatePage: activateState,
    deactivatePage: deactivateState
  };
})();
