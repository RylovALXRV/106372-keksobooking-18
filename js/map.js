'use strict';

(function () {

  var mapElement = document.querySelector('.map');

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
    getParameter: getMapParameters,
    setDefault: setDefaultStateMap
  };
})();
