'use strict';

(function () {

  var mapElement = document.querySelector('.map');
  var featuresElement = mapElement.querySelector('.map__features');
  var filtersElement = mapElement.querySelector('.map__filters');
  var filterElements = filtersElement.querySelectorAll('.map__filter');

  var onPopupEscKeydown = function (evt) {
    if (evt.keyCode === window.util.KEYCODE_ESC) {
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

  window.map = {
    closePopup: closePopup,
    onPopupEsc: onPopupEscKeydown,
    toggleStateFilters: toggleDisabledStateOfFilters
  };
})();
