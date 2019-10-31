'use strict';

(function () {

  var Pin = {
    START_HEIGHT: 65,
    TOTAL_HEIGHT: 81,
    WIDTH: 65
  };

  var mapElement = document.querySelector('.map');
  var pinMainElement = mapElement.querySelector('.map__pin--main');

  var pinCenterX = Pin.WIDTH / 2;

  var Coord = function (coord) {
    this.left = coord.left + window.pageXOffset;
    this.top = coord.top + window.pageYOffset;
  };

  Coord.prototype.getElementLocation = function (locationX, locationY) {
    return parseFloat(locationX) + ', ' + parseFloat(locationY);
  };

  var mainPinCoord = new Coord(pinMainElement.getBoundingClientRect());

  window.mainPin = {
    activeLocation: mainPinCoord.getElementLocation(Math.round(mainPinCoord.left + pinCenterX),
        Math.round(mainPinCoord.top + Pin.TOTAL_HEIGHT)),
    initLocation: mainPinCoord.getElementLocation(Math.round(mainPinCoord.left + pinCenterX),
        Math.round(mainPinCoord.top + Pin.START_HEIGHT / 2))
  };
})();
