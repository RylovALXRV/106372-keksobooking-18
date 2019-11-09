'use strict';

(function () {

  var mapElement = document.querySelector('.map');

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

  var getMapParameters = function () {
    return mapElement.getBoundingClientRect();
  };

  var setDefaultStateMap = function () {
    mapElement.classList.add('map--faded');

    window.mainPin.setDefaultLocation();
    window.pins.hide();
    window.card.hide();
  };

  window.map = {
    closePopup: closePopup,
    getParameter: getMapParameters,
    onPopupEsc: onPopupEscKeydown,
    setDefault: setDefaultStateMap
  };
})();
