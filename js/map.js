'use strict';

(function () {

  var mapElement = document.querySelector('.map');
  var featuresElement = mapElement.querySelector('.map__features');
  var filtersElement = mapElement.querySelector('.map__filters');
  var filterElements = filtersElement.querySelectorAll('.map__filter');

  var onPopupEscKeydown = function (evt) {
    if (window.util.isKeyCode(evt, window.util.KEYCODE_ESC)) {
      closePopup();
    }
  };

  var closePopup = function () {
    window.card.hide();
    window.pins.reset();

    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  var toggleDisabledStateOfFilters = function (isDisabled) {
    window.util.toggleDisabledStateOfElements(filterElements, isDisabled);
    featuresElement.disabled = isDisabled;
  };

  var getMapParameters = function () {
    return mapElement.getBoundingClientRect();
  };

  var setDefaultStateMap = function () {
    mapElement.classList.add('map--faded');

    toggleDisabledStateOfFilters(true);
    window.mainPin.setDefaultLocation();
    window.pins.hide();
  };

  window.map = {
    closePopup: closePopup,
    getParameter: getMapParameters,
    onPopupEsc: onPopupEscKeydown,
    setDefault: setDefaultStateMap,
    toggleStateFilters: toggleDisabledStateOfFilters
  };
})();
