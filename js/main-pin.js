'use strict';

(function () {

  var CoordY = {
    MAX: 630,
    MIN: 130
  };

  var Pin = {
    START_HEIGHT: 65,
    TOTAL_HEIGHT: 81,
    WIDTH: 65
  };

  var mapElement = document.querySelector('.map');
  var pinMainElement = mapElement.querySelector('.map__pin--main');

  var mapParameter = null;
  var pinCenterX = Pin.WIDTH / 2;

  var Coord = function (locationX, locationY) {
    this.x = locationX;
    this.y = locationY;
  };

  Coord.prototype.getElementLocation = function (locationX, locationY) {
    return parseFloat(locationX) + ', ' + parseFloat(locationY);
  };

  Coord.prototype.setResultCoords = function (coord) {
    if (coord.x <= -pinCenterX) {
      coord.x = -pinCenterX;
    } else if (coord.x >= mapParameter.width - pinCenterX) {
      coord.x = mapParameter.width - pinCenterX;
    } else if (coord.y <= CoordY.MIN) {
      coord.y = CoordY.MIN;
    } if (coord.y >= CoordY.MAX) {
      coord.y = CoordY.MAX;
    }
  };

  Coord.prototype.setElementCoord = function (coord) {
    coord.setResultCoords(coord);

    window.form.setAddress(coord.getElementLocation(Math.round(coord.x + pinCenterX), Math.round(coord.y)));

    pinMainElement.style.left = coord.x + 'px';
    pinMainElement.style.top = coord.y + 'px';
  };

  var pinDefaultLocation = new Coord(pinMainElement.offsetLeft, pinMainElement.offsetTop);
  var mainPinCoord = new Coord();

  var setPinDefaultLocation = function () {
    pinMainElement.style.left = pinDefaultLocation.x + 'px';
    pinMainElement.style.top = pinDefaultLocation.y + 'px';
  };

  pinMainElement.addEventListener('mousedown', function (evt) {
    window.page.activate();

    mapParameter = window.map.getParameter();
    mainPinCoord = new Coord(evt.clientX, evt.clientY);

    var onMainPinMousemove = function (evtMove) {
      var shift = new Coord(mainPinCoord.x - evtMove.clientX, mainPinCoord.y - evtMove.clientY);
      mainPinCoord = new Coord(evtMove.clientX, evtMove.clientY);
      var result = new Coord(pinMainElement.offsetLeft - shift.x, pinMainElement.offsetTop - shift.y);

      result.setElementCoord(result);
    };

    var onMainPinMouseUp = function () {
      document.removeEventListener('mousemove', onMainPinMousemove);
      document.removeEventListener('mouseup', onMainPinMouseUp);
    };

    document.addEventListener('mousemove', onMainPinMousemove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  });

  pinMainElement.addEventListener('keydown', function (evt) {
    if (window.util.isEnterEvent(evt)) {
      window.page.activate();
    }
  });

  window.mainPin = {
    activeLocation: mainPinCoord.getElementLocation(Math.round(pinMainElement.offsetLeft + pinCenterX),
        Math.round(pinMainElement.offsetTop + Pin.TOTAL_HEIGHT)),
    initLocation: mainPinCoord.getElementLocation(Math.round(pinMainElement.offsetLeft + pinCenterX),
        Math.round(pinMainElement.offsetTop + Pin.START_HEIGHT / 2)),
    setDefaultLocation: setPinDefaultLocation
  };
})();
